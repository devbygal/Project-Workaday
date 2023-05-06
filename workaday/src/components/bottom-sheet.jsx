import React, { useContext, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetContext } from './context/BottomSheetContext';
import ThemeToggle from './theme-toggle';
import { Center, View } from 'native-base';

const BottomSheetComponent = () => {
  const { state, closeBottomSheet } = useContext(BottomSheetContext);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['20%', '40%'], []);

  //const handleClosePress = () => bottomSheetRef.current.close();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onClose={closeBottomSheet}
      index={state.isOpen ? 0 : -1}
      enablePanDownToClose={true}
      // add bottom inset to elevate the sheet
      bottomInset={46}
      // set `detached` to true
      detached={true}
      style={styles.container}
    >
      
      <View style={styles.contentContainer}>
        <Center>
          <ThemeToggle />
        </Center>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sheetContainer: {
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomSheetComponent;
