
const set = async (key: string, value: any) => {
  try {
    await localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key: string) => {
  try {
    const value = await localStorage.getItem(key);
    if (!!value) {
      const item = JSON.parse(value);
      if (item == null) return null;
      return item;
    }

  } catch (error) {
    console.log(error);
  }
};

const remove = async (key: string) => {
  try {
    await localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const cache = {
  set,
  get,
  remove,
};

export default cache;