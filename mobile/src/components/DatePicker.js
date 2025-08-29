import React, { useState } from 'react';
import { Text, Pressable, Platform } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker({ date, setDate, minDate, maxDate }) {
  const [showPicker, setShowPicker] = useState(false);
  const shouldShowPicker = Platform.OS === 'ios' || (Platform.OS === 'android' && showPicker);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'ios' && selectedDate) {
      setDate(selectedDate);
    } else if (Platform.OS === 'android') {
      if (selectedDate && event.type === 'set') {
        setDate(selectedDate);
      }
      setShowPicker(false);
    }
  }

  return (
    <>{Platform.OS ==='android' && (
      <Pressable style={{borderRadius: 4, padding: 4, backgroundColor: 'lightgray'}} onPress={() => setShowPicker(true)}>
        <Text style={{textAlign: 'center'}}>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
      </Pressable>
    )}
    {shouldShowPicker && (
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={handleDateChange}
        minimumDate={minDate}
        maximumDate={maxDate}
      />
    )}</>
  );
}