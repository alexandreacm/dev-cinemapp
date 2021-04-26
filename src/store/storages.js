import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '@/helpers/constants/storageKeys';

// eslint-disable-next-line consistent-return
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const storeData = async (value = []) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export { getData, storeData };
