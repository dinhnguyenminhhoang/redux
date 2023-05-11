console.log(window.Redux);
const { createStore } = window.Redux;
//state->reducer->store
const initialState = JSON.parse(localStorage.getItem("hobbyList")) || [];
const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY":
      const newList = [...state];
      newList.push(action.payload);
      return newList;
    default:
      return state;
  }
};
const store = createStore(hobbyReducer);
//render
const renderHobbyList = (hobbylist) => {
  if (!Array.isArray(hobbylist) || hobbylist.length === 0) return;
  const ulElement = document.querySelector("#hobbies-list");
  if (!ulElement) return;
  //reset
  ulElement.innerHTML = "";
  for (const hobby of hobbylist) {
    const liElement = document.createElement("li");
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }
};
//handle form submission
const formHobby = document.querySelector("#hobby-form");
if (formHobby) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputFormHobby = document.querySelector("#hobby-text");
    if (!inputFormHobby || !inputFormHobby.value.trim()) return;
    const action = {
      type: "ADD_HOBBY",
      payload: inputFormHobby.value,
    };
    store.dispatch(action);
    formHobby.reset();
  };
  formHobby.addEventListener("submit", handleSubmit);
}
store.subscribe(() => {
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);

  localStorage.setItem("hobbyList", JSON.stringify(newHobbyList));
});
//render inital hobby list
const initialHobbyList = store.getState();
renderHobbyList(initialState);
