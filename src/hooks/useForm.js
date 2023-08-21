import {useState} from "react";

function useForm(initValues) {
  const [values, setValues] = useState(initValues);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
export default useForm;
