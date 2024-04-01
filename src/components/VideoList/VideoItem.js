import { ResizeMode, Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import PropTypes from 'prop-types';
import React, { useMemo, useRef } from 'react';
import { Image, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';
import YoutubePlayer from 'react-native-youtube-iframe';

import Avatar from '@components/Avatar/Avatar';

export default function VideoItem(props) {
  const {
    item,
    onPress,
    onRemovePress,
    containerStyle,
    showEditButton,
    ...restProps
  } = props;

  const videoRef = useRef(null);

  const youtubeId = useMemo(() => {
    const youtubeRegex =
      /(?:https?:\/\/(?:www\.)?)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/)?([\w\-_]+)(?:\S+)?/;
    const match = item.uri.match(youtubeRegex);
    if (match && match[1]) return match[1];
    return null;
  }, [item.uri]);

  return (
    <View style={[showEditButton && [tw.pT2, tw.pR2], containerStyle]}>
      {youtubeId ? (
        <YoutubePlayer
          width={150}
          height={(150 * 9) / 16}
          videoId={youtubeId}
          contentScale={0.6}
          webViewStyle={{ opacity: 0.99 }}
        />
      ) : (
        <VideoPlayer
          videoProps={{
            ref: videoRef,
            source: { uri: item.uri },
            resizeMode: ResizeMode.CONTAIN,
          }}
          fullscreen={{
            enterFullscreen: () => {
              videoRef.current?.presentFullscreenPlayer();
              videoRef.current?.setStatusAsync({
                shouldPlay: true,
              });
            },
          }}
          style={{ width: 150, height: (150 * 9) / 16 }}
        />
      )}
      {showEditButton && (
        <Avatar
          icon={{ name: 'close' }}
          style={[tw.absolute, tw.w4, tw.h4, tw.right0]}
          status="danger"
          onPress={() => onRemovePress?.(item)}
        />
      )}
    </View>
  );
}

VideoItem.propTypes = {
  item: PropTypes.any,
  showEditButton: PropTypes.bool,
};
