import { useState, useEffect } from "react";
import "../App.css";
import { ICity, ICountry, IState } from "../interface/country";
import { useNavigate } from "react-router-dom";
import http from "../services/http-common";

export const SignUp = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const navigate = useNavigate();
  var newAge = 0;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dateOfBirth: "",
    age: "",
  });
  const [validation, setValidation] = useState<ValidationState>({
    firstName: false,
    lastName: false,
    email: false,
    country: false,
    state: false,
    city: false,
    gender: false,
    dateOfBirth: false,
    age: false,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.name === value
      );
      const selectedStates = selectedCountry?.states || [];
      const selectedCities = selectedCountry?.states[0].cities || [];
      setStates(selectedStates);
      setCities(selectedCities);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      age: calculateAge(),
    };

    http
      .post("/register", userData)
      .then(() => console.log("User registered successfully"))
      .catch((e) => console.log(e))
  };

  const calculateAge = () => {
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const ageDiff = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiff);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      newAge = age;
      return age;
    }
    return 0;
  };

  useEffect(() => {
    http
      .get<ICountry[]>("/countries")
      .then((res) => setCountries(res.data))
      .catch((e) => console.log(e));
  }, []);

  console.log(validation)

  const validateField = (name: keyof typeof formData, value: string) => {
    console.log(name)
    switch (name) {
      case "firstName":
        return /^[A-Za-z]+$/.test(value);
      case "lastName":
        return /^[A-Za-z]+$/.test(value);
      case "email":
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
      case "country":
        return true;
      case "state":
        return value.length > 0;
      case "city":
        return value.length > 0;
      case "gender":
        return value.length > 0;
      case "dateOfBirth":
        if (newAge >= 14) {
          validation.age = true;
          return true;
        }
        validation.age = false;
        return false;
      default:
        return false;
    }
  };

  type ValidationField = keyof ValidationState;

  const validateAllFields = () => {
    for (const key in validation) {
      if (!validation[key as ValidationField]) {
        return false;
      }
    }
    return true;
  };

  return (
    <form className="user-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-Mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="gender-section form-group">
        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={(e) => handleChange(e)}
              required
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={(e) => handleChange(e)}
              required
            />{" "}
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={(e) => handleChange(e)}
              required
            />{" "}
            Other
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age: {validation.age === true ? " " : "must more than 14"}</label>
        <input
          type="text"
          id="age"
          name="age"
          value={calculateAge()}
          onChange={(e) => handleChange(e)}
          disabled
        />
      </div>
      {validateAllFields() === true ? (
        <button type="submit">Submit</button>
      ) : (
        <button disabled type="submit">
          Submit
        </button>
      )}
      <button style={{ marginTop: "5px"}} type="submit" onClick={() => navigate("/users")}>
          Next page
        </button>
    </form>
  );
};

type ValidationState = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  country: boolean;
  state: boolean;
  city: boolean;
  gender: boolean;
  dateOfBirth: boolean;
  age: boolean;
};
