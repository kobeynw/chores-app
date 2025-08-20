import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import FormDropdown from '../components/FormDropdown';
import FormMultiSelectDropdown from '../components/FormMultiSelectDropdown';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from '../context/AuthContext';

export default function AddChoreDisplay() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [priority, setPriority] = useState(0);

  const today = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(today.getFullYear() + 1);
  const oneYearPrevious = new Date();
  oneYearPrevious.setFullYear(today.getFullYear() - 1);

  const [frequency, setFrequency] = useState("");
  const [dueDate, setDueDate] = useState(today);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const { token } = useAuth();

  const handleAddNewChore = async () => {
    if (title.length > 0 && points > 0 && xp > 0) {
      try {
        // Add chore using API
        // Validate that start date is before end date if applicable
      } catch (error) {
        console.error("Error creating chore:", error);
        Alert.alert("Something went wrong while adding the chore.");
      }
    } else {
      Alert.alert("Please enter valid title, points, and priority.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FormContainer title="Add a new chore">
          <FormInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            maxLength={25}
          />
          <FormInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            maxLength={150}
          />
          <FormInput
            placeholder="Points"
            value={points > 0 ? points : 0}
            onChangeText={setPoints}
            maxLength={4}
            keyboardType="number-pad"
          />
          <FormDropdown
            value={priority}
            onValueChange={setPriority}
            items={[
              {label: 'Low', value: 'Low'},
              {label: 'Medium', value: 'Medium'},
              {label: 'High', value: 'High'},
            ]}
            placeholder='Priority'
          />
          <FormDropdown
            value={frequency}
            onValueChange={setFrequency}
            items={[
              { label: 'Once', value: 'Once' },
              { label: 'Daily', value: 'Daily' },
              { label: 'Weekly', value: 'Weekly' },
              { label: 'Custom', value: 'Custom' },
            ]}
            placeholder='Frequency'
          />
          {frequency == "Once" && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) setDueDate(selectedDate);
              }}
              minimumDate={oneYearPrevious}
              maximumDate={oneYearLater}
            />
          )}
          {frequency == "Weekly" && (
            <><FormDropdown
              value={dayOfWeek}
              onValueChange={setDayOfWeek}
              items={[
                { label: 'Monday', value: 'Monday' },
                { label: 'Tuesday', value: 'Tuesday' },
                { label: 'Wednesday', value: 'Wednesday' },
                { label: 'Thursday', value: 'Thursday' },
                { label: 'Friday', value: 'Friday' },
                { label: 'Saturday', value: 'Saturday' },
                { label: 'Sunday', value: 'Sunday' },
              ]}
              placeholder='Day'
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
              <Text style={{ width: 35 }}>From</Text>
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setStartDate(selectedDate);
                }}
                minimumDate={oneYearPrevious}
                maximumDate={oneYearLater}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingLeft: 12 }}>
              <Text style={{ width: 35 }}>To</Text>
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setEndDate(selectedDate);
                }}
                minimumDate={oneYearPrevious}
                maximumDate={oneYearLater}
              />
            </View></>
          )}
          {frequency == "Custom" && (
            <><FormMultiSelectDropdown
              values={daysOfWeek}
              onValuesChange={setDaysOfWeek}
              items={[
                { label: 'Monday', value: 'Monday' },
                { label: 'Tuesday', value: 'Tuesday' },
                { label: 'Wednesday', value: 'Wednesday' },
                { label: 'Thursday', value: 'Thursday' },
                { label: 'Friday', value: 'Friday' },
                { label: 'Saturday', value: 'Saturday' },
                { label: 'Sunday', value: 'Sunday' },
              ]}
              placeholder='Days'
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
              <Text style={{ width: 35 }}>From</Text>
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setStartDate(selectedDate);
                }}
                minimumDate={oneYearPrevious}
                maximumDate={oneYearLater}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingLeft: 12 }}>
              <Text style={{ width: 35 }}>To</Text>
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setEndDate(selectedDate);
                }}
                minimumDate={oneYearPrevious}
                maximumDate={oneYearLater}
              />
            </View></>
          )}
          <View style={{ alignItems: 'center' }}>
            <Pressable 
              style={pressableStyle}
              onPress={handleAddNewChore}
            >
              <Text style={styles.text}>Add Chore</Text>
            </Pressable>
          </View>
        </FormContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 20, color: '#212121', textAlign: 'center' },
  button: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginVertical: 30,
    backgroundColor: '#FFCCFF',
  },
});

const pressableStyle = ({ pressed }) => [
  styles.button,
  { opacity: pressed ? 0.6 : 1, width: '70%' },
];