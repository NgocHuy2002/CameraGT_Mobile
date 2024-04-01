import { Spinner, Text } from '@ui-kitten/components';
import { useUpdateEffect } from 'ahooks';
import { produce } from 'immer';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import renderNode from '@helpers/renderNode';

import { Row } from '../Stack';

const LOAD_STATE = {
  NONE: 0,
  IDLE: 1,
  FIRST_LOAD: 2,
  REFRESH: 3,
  LOAD_MORE: 4,
  FULL_LOAD: 5,
};

const emptyArray = [];

const ProList = forwardRef(function ProList(props, ref) {
  const {
    data = emptyArray,
    itemKey = '_id',
    request,
    onRequest,
    params,
    pageSize = 10,
    reloadDeps = emptyArray,
    refreshable = true,
    refreshControlProps,
    pagination = true,
    emptyText = 'Không có dữ liệu',
    loadingText = 'Đang tải',
    loadMoreText = 'Đang tải thêm dữ liệu',
    allLoadedText = 'Hoàn thành tải dữ liệu',
    emptyComponent,
    loadingComponent,
    loadMoreComponent,
    allLoadedComponent,
    ...restProps
  } = props;
  const numberCol = 2;

  const pageRef = useRef(0);
  const listRef = useRef(null);

  const [loadState, setLoadState] = useState(LOAD_STATE.NONE);
  const [dataSource, setDataSource] = useState(data);

  useUpdateEffect(() => {
    setDataSource(data);
  }, [data]);

  useEffect(() => {
    if (!data || !data.length) setDataSource([]);
    onFirstLoad();
  }, [params, ...reloadDeps]);

  useImperativeHandle(
    ref,
    () => ({
      getData,
      updateData,
      addItem,
      updateItem,
      deleteItem,
      batchUpdateItem,
    }),
    [dataSource],
  );

  const setPage = (page) => {
    pageRef.current = page;
  };

  const getPage = () => {
    return pageRef.current;
  };

  const getData = () => {
    return dataSource;
  };

  const updateData = (newData) => {
    setDataSource(produce(newData));
  };

  const batchUpdateItem = (batchUpdate) => {
    const newData = produce((draft) => {
      draft.forEach(batchUpdate);
    });
    setDataSource(newData);
  };

  const addItem = (itemData, first = false) => {
    const newData = produce(dataSource, (draft) => {
      if (first) draft.unshift(itemData);
      else draft.push(itemData);
    });
    setDataSource(newData);
  };

  const updateItem = (itemId, itemData) => {
    const itemIndex = getItemIndex(itemId);
    if (itemIndex > -1) {
      const newData = produce(dataSource, (draft) => {
        Object.assign(draft[itemIndex], itemData);
      });
      setDataSource(newData);
    }
  };

  const deleteItem = (itemId) => {
    const itemIndex = getItemIndex(itemId);
    if (itemIndex > -1) {
      const newData = produce(dataSource, (draft) => {
        draft.splice(itemIndex, 1);
      });
      setDataSource(newData);
    }
  };

  const getItemIndex = (itemId) => {
    if (typeof itemId === 'number') {
      return itemId;
    }
    if (typeof itemId === 'string') {
      const itemIndex = dataSource.findIndex(
        (item, index) => getItemKey(item, index) === itemId,
      );
      return itemIndex;
    }
    return -1;
  };

  const getItemKey = (item, index) => {
    if (typeof itemKey === 'function') {
      return item[itemKey(item, index)];
    }
    return item[itemKey];
  };

  const _onRequest = async () => {
    let _loadState = LOAD_STATE.IDLE;
    if (onRequest) {
      await onRequest(getPage(), pageSize, params);
    } else if (request) {
      const dataRes = await request(getPage(), pageSize, params);
      if (dataRes && dataRes.data) {
        if (dataRes.data.length > 0) {
          if (getPage() > 1) {
            setDataSource((data) => [...data, ...dataRes.data]);
          } else {
            setDataSource(dataRes.data);
          }
        } else if (getPage() > 1) {
          _loadState = LOAD_STATE.FULL_LOAD;
        }
      }
    }
    setLoadState(_loadState);
  };

  const onFirstLoad = async () => {
    try {
      setLoadState(LOAD_STATE.FIRST_LOAD);
      setPage(1);
      _onRequest();
    } catch (error) {
      setLoadState(LOAD_STATE.IDLE);
    }
  };

  const onRefreshLoad = async () => {
    try {
      setLoadState(LOAD_STATE.REFRESH);
      setPage(1);
      _onRequest();
    } catch (error) {
      setLoadState(LOAD_STATE.IDLE);
    }
  };

  const onEndReached = () => {
    if (listRef.current?._listRef._scrollMetrics.offset > 1) {
      if (pagination && loadState === LOAD_STATE.IDLE) {
        onLoadMore();
      }
    }
  };

  const onLoadMore = async () => {
    try {
      setLoadState(LOAD_STATE.LOAD_MORE);
      setPage(getPage() + 1);
      _onRequest();
    } catch (error) {
      setPage(getPage() - 1);
      setLoadState(LOAD_STATE.IDLE);
    }
  };

  const renderRefreshControl = () => {
    if (refreshable) {
      return (
        <RefreshControl
          {...refreshControlProps}
          refreshing={loadState === LOAD_STATE.REFRESH}
          onRefresh={onRefreshLoad}
        />
      );
    }
    return null;
  };

  const renderEmpty = () => {
    if (loadState === LOAD_STATE.IDLE) {
      if (emptyComponent) {
        return renderNode(null, emptyComponent);
      }
      return (
        <View style={[tw.p4, tw.itemsCenter, tw.justifyCenter]}>
          <Text>{emptyText}</Text>
        </View>
      );
    }
    return null;
  };

  const renderFooter = () => {
    if (loadState === LOAD_STATE.FIRST_LOAD) {
      return renderFirstLoad();
    } else if (loadState === LOAD_STATE.LOAD_MORE) {
      return renderLoadMore();
    } else if (loadState === LOAD_STATE.FULL_LOAD) {
      return renderAllLoaded();
    }
    return null;
  };

  const renderFirstLoad = () => {
    if (loadingComponent) {
      return renderNode(null, loadingComponent);
    }
    return (
      <Row space={2} style={[tw.p4, tw.itemsCenter, tw.justifyCenter]}>
        <Spinner />
        <Text>{loadingText}</Text>
      </Row>
    );
  };

  const renderLoadMore = () => {
    if (loadMoreComponent) {
      return renderNode(null, loadMoreComponent);
    }
    return (
      <Row space={1} style={[tw.p2, tw.itemsCenter, tw.justifyCenter]}>
        <Spinner size="tiny" />
        <Text>{loadMoreText}</Text>
      </Row>
    );
  };

  const renderAllLoaded = () => {
    if (allLoadedComponent) {
      return renderNode(null, allLoadedComponent);
    }
    return (
      <View style={[tw.flexRow, tw.p2, tw.itemsCenter, tw.justifyCenter]}>
        <Text>{allLoadedText}</Text>
      </View>
    );
  };

  return (
    <FlatList
      ref={listRef}
      keyExtractor={getItemKey}
      onEndReachedThreshold={0.1}
      contentInsetAdjustmentBehavior="automatic"
      {...restProps}
      data={dataSource}
      refreshControl={renderRefreshControl()}
      onEndReached={onEndReached}
      numColumns={numberCol}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
    />
  );
});

export default ProList;
