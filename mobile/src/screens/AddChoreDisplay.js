import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import FormDropdown from '../components/FormDropdown';
import FormMultiSelectDropdown from '../components/FormMultiSelectDropdown';
import DatePicker from '../components/DatePicker';
import { createChore } from '../api/chore';
import { useAuth } from '../context/AuthContext';

export default function AddChoreDisplay() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [priority, setPriority] = useState("");
  const [childRecipients, setChildRecipients] = useState([]);

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

  const { token, childProfiles } = useAuth();

  const FREQUENCY_VALUES = ["Once", "Daily", "Weekly", "Custom"];
  const PRIORITY_VALUES = ["Low", "Medium", "High"];
  const DAY_VALUES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const XP_INCREMENT = 500;

  const handleAddNewChore = async () => {
    if (validateParams()) {
      try {
        await createChore(newChore(), token);
        Alert.alert("Successfully added chore");
        setTitle("");
        setDescription("");
        setPoints(0);
        setPriority("");
        setChildRecipients([]);
        setFrequency("");
        setDueDate(today);
        setDayOfWeek("");
        setStartDate(today);
        setEndDate(today);
        setDaysOfWeek([]);
      } catch (error) {
        console.error("Error creating chore:", error);
        Alert.alert("Something went wrong while adding the chore.");
      }
    }
  };

  const validateParams = () => {
    if (title.length <= 0) {
      Alert.alert("Please enter a title.");
      return false;
    } else if (points < 0) {
      Alert.alert("Please enter valid points.");
      return false;
    } else if (!PRIORITY_VALUES.includes(priority)) {
      Alert.alert("Please enter a valid priority.");
      return false;
    } else if (!FREQUENCY_VALUES.includes(frequency)) {
      Alert.alert("Please enter a valid frequency.");
      return false;
    } else if ((frequency == "Weekly" || frequency == "Custom") && startDate.setHours(0,0,0,0).valueOf() > endDate.setHours(0,0,0,0).valueOf()) {
      Alert.alert("Please enter a start date that occurs before the end date.");
      return false;
    } else if (frequency == "Weekly" && !DAY_VALUES.includes(dayOfWeek)) {
      Alert.alert("Please enter a valid day of the week.");
      return false;
    } else if (frequency == "Custom") {
      if (daysOfWeek.length <= 0) {
        Alert.alert("Please enter valid days of the week.");
        return false;
      }
      daysOfWeek.forEach(day => {
        if (!DAY_VALUES.includes(day)) {
          Alert.alert("Please enter valid days of the week.");
          return false;
        }
      });
    }

    return true;
  }

  const newChore = () => {
    let xp = 0;
    PRIORITY_VALUES.forEach((priorityVal, index) => {
      if (priority === priorityVal) {
        xp = (index + 1) * XP_INCREMENT;
      }
    });

    return {
      "title": title,
      "description": description,
      "points": points,
      "xp": xp,
      "frequency": frequency.toLowerCase(),
      "due_date": dueDate,
      "day_of_week": dayOfWeek.toLowerCase(),
      "days_of_week": daysOfWeek,
      "start_date": startDate,
      "end_date": endDate,
    };
  }

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
            items={PRIORITY_VALUES.map(p => ({ label: p, value: p }))}
            placeholder='Priority'
          />
          <FormDropdown
            value={frequency}
            onValueChange={setFrequency}
            items={FREQUENCY_VALUES.map(f => ({ label: f, value: f }))}
            placeholder='Frequency'
          />
          {frequency == "Once" && (
            <DatePicker
              date={dueDate}
              setDate={setDueDate}
              minDate={oneYearPrevious}
              maxDate={oneYearLater}
            />
          )}
          {frequency == "Weekly" && (
            <><FormDropdown
              value={dayOfWeek}
              onValueChange={setDayOfWeek}
              items={DAY_VALUES.map(d => ({ label: d, value: d }))}
              placeholder='Day'
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
              <Text style={{ width: 35 }}>From</Text>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                minDate={oneYearPrevious}
                maxDate={oneYearLater}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingLeft: 12 }}>
              <Text style={{ width: 35 }}>To</Text>
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                minDate={oneYearPrevious}
                maxDate={oneYearLater}
              />
            </View></>
          )}
          {frequency == "Custom" && (
            <><FormMultiSelectDropdown
              values={daysOfWeek}
              onValuesChange={setDaysOfWeek}
              items={DAY_VALUES.map(d => ({ label: d, value: d }))}
              placeholder='Days'
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
              <Text style={{ width: 35 }}>From</Text>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                minDate={oneYearPrevious}
                maxDate={oneYearLater}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingLeft: 12 }}>
              <Text style={{ width: 35 }}>To</Text>
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                minDate={oneYearPrevious}
                maxDate={oneYearLater}
              />
            </View></>
          )}
          <FormMultiSelectDropdown
            values={childRecipients}
            onValuesChange={setChildRecipients}
            items={childProfiles.map(profile => ({ label: profile.name, value: profile.name }))}
            placeholder='Children'
          />
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