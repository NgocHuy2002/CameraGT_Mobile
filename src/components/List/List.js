import { Ionicons } from '@expo/vector-icons';
import { Spinner, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import { LOAD_STATE } from './constants';

export default function List(props) {
  const {
    Component = FlatList,
    loadState,
    emptyText = 'Không có kết quả',
    loadMoreText = 'Đang tải thêm dữ liệu',
    firstLoadText = 'Đang tải dữ liệu',
    fullLoadText = 'Đã tải tất cả dữ liệu',
    emptyStyle,
    loadMoreStyle,
    firstLoadStyle,
    fullLoadStyle,
    inverted,
    scrollToTop,
    scrollToTopFirstLoad,
    ...restProps
  } = props;

  const OFFSET = 250;
  const [currentOffset, setCurrentOffset] = React.useState(0);

  const listRef = React.useRef(null);

  // React.useEffect(() => {
  //   if (scrollToTopFirstLoad) handleScrollToTop();
  // }, []);

  const handleScrollToTop = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  const onRefresh = React.useCallback(() => {
    if (loadState === LOAD_STATE.IDLE || loadState === LOAD_STATE.FULL_LOAD) {
      props.onRefresh(LOAD_STATE.REFRESH);
    }
  }, [loadState]);

  const onLoadmore = React.useCallback(() => {
    if (loadState === LOAD_STATE.IDLE) {
      // if (listRef.current?._listRef._scrollMetrics.offset > 1) {
      props.onLoadmore(LOAD_STATE.LOAD_MORE);
      // }
    }
  }, [loadState]);

  const listProps = React.useMemo(
    () => ({
      ...(props.onRefresh && { onRefresh }),
      ...(props.onLoadmore && { onEndReached: onLoadmore }),
    }),
    [loadState],
  );

  const renderEmpty = React.useCallback(() => {
    if (loadState === LOAD_STATE.IDLE) {
      if (props.renderEmpty) {
        return props.renderEmpty();
      }

      return (
        <View style={[tw.pY5, tw.itemsCenter, tw.justifyCenter, emptyStyle]}>
          <Text>{emptyText}</Text>
        </View>
      );
    }
    return null;
  }, [loadState, emptyText, emptyStyle]);

  const renderFooter = React.useCallback(() => {
    if (loadState === LOAD_STATE.FIRST_LOAD) {
      return renderFirstLoad();
    }
    if (loadState === LOAD_STATE.LOAD_MORE) {
      return renderLoadMore();
    }
    if (loadState === LOAD_STATE.FULL_LOAD) {
      return renderFullLoad();
    }
    return null;
  }, [loadState]);

  const renderFirstLoad = React.useCallback(() => {
    if (props.renderFirstLoad) {
      return props.renderFirstLoad();
    }

    return (
      <View style={[tw.pY5, tw.itemsCenter, tw.justifyCenter, firstLoadStyle]}>
        <Spinner size="large" />
        <Text style={tw.mT1}>{firstLoadText}</Text>
      </View>
    );
  }, [firstLoadText, firstLoadStyle]);

  const renderLoadMore = React.useCallback(() => {
    if (props.renderLoadMore) {
      return props.renderLoadMore();
    }

    return (
      <View
        style={[
          tw.flexRow,
          tw.p4,
          tw.itemsCenter,
          tw.justifyCenter,
          loadMoreStyle,
        ]}
      >
        <Spinner size="small" />
        <Text style={tw.mL2}>{loadMoreText}</Text>
      </View>
    );
  }, [loadMoreText, loadMoreStyle]);

  const renderFullLoad = React.useCallback(() => {
    if (props.renderFullLoad) {
      return props.renderFullLoad();
    }

    return (
      <View
        style={[
          tw.flexRow,
          tw.p4,
          tw.pB0,
          tw.itemsCenter,
          tw.justifyCenter,
          fullLoadStyle,
        ]}
      >
        <Text>{fullLoadText}</Text>
      </View>
    );
  }, [fullLoadText, fullLoadStyle]);

  const renderScrollToTopButton = () => {
    if (scrollToTop && currentOffset > OFFSET)
      return (
        <TouchableOpacity
          onPress={handleScrollToTop}
          style={[
            tw.absolute,
            tw.z10,
            tw.bottom0,
            tw.right0,
            tw.h10,
            tw.w10,
            tw.bgWhite,
            tw.roundedFull,
            tw.justifyCenter,
            tw.itemsCenter,
            tw.mB4,
            tw.mR4,
            {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          ]}
        >
          <Ionicons name={inverted ? 'arrow-down' : 'arrow-up'} size={24} />
        </TouchableOpacity>
      );

    return null;
  };

  const handleScroll = (event) => {
    if (scrollToTop) setCurrentOffset(event.nativeEvent.contentOffset.y);
  };

  return (
    <View style={[tw.flex1]}>
      {renderScrollToTopButton()}
      <Component
        ref={listRef}
        onEndReachedThreshold={0.1}
        inverted={inverted || false}
        {...restProps}
        {...listProps}
        refreshing={loadState === LOAD_STATE.REFRESH}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onScroll={handleScroll}
      />
    </View>
  );
}

List.propTypes = {
  loadState: PropTypes.number,
  emptyText: PropTypes.string,
  loadMoreText: PropTypes.string,
  firstLoadText: PropTypes.string,
  fullLoadText: PropTypes.string,
  emptyStyle: PropTypes.any,
  loadMoreStyle: PropTypes.any,
  firstLoadStyle: PropTypes.any,
  fullLoadStyle: PropTypes.any,
  onRefresh: PropTypes.func,
  onLoadmore: PropTypes.func,
  renderEmpty: PropTypes.func,
  renderLoadMore: PropTypes.func,
  renderFirstLoad: PropTypes.func,
  renderFullLoad: PropTypes.func,
};
