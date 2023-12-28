import {useState, ChangeEvent} from "react";

function useForm(initValues: {[key: string]: string}) {
  const [values, setValues] = useState(initValues);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
export default useForm;
