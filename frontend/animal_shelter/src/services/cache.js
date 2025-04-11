//user_type can be only "volunteer" or "shelter"
function set_user_type(user_type) {
  try {
    sessionStorage.setItem("user_type", user_type);
  } catch (error) {
    throw new Error(`An error occured ${error}`);
  }
}

function get_user_type() {
  try {
    const user_type = sessionStorage.getItem("user_type");
    return user_type;
  } catch (error) {
    throw new Error(`An error occured ${error}`);
  }
}

function save_user_id(user_id) {
  try {
    const user_type = get_user_type();
    const key = user_type === "volunteer" ? "volunteer" : "shelter"; // Оголошення змінної key
    sessionStorage.setItem(key, user_id);
  } catch (e) {
    throw new Error("Cannot put shelter_id");
  }
}

function get_user_id() {
  try {
    const user_type = get_user_type();
    const key = user_type === "volunteer" ? "volunteer" : "shelter"; // Оголошення змінної key
    return sessionStorage.getItem(key);
  } catch (error) {
    throw new Error(`An error occured ${error}`);
  }
}

export { get_user_id, save_user_id, get_user_type, set_user_type };
