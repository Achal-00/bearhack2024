import {
  AGES,
  DIETS,
  GENDERS,
  GRADES,
  MAJORS,
  SHIRTS,
} from "@/data/dynamic/forms/Information";
import { SCHOOLS } from "@/data/dynamic/forms/Schools";
import Input from "../Input";
import Radio from "../Radio";
import Select from "../Select";
import Button from "../Button";
import Checkbox from "../Checkbox";
import axios from "axios";
import toast from "react-hot-toast";

const User = ({ user, setUser, edit, setEdit }) => {
  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    axios
      .post("/api/participant", user)
      .then(() => {
        toast("✅ Successfully Update!");
        setEdit(false);
      })
      .catch(() => {
        toast("❌ Internal Server Error");
        setEdit(false);
      });
  };
  return (
    <div className="bg-white rounded-lg gap-3 flex flex-col m-2 max-h-[70vh] pb-4">
      <div className="gap-3 flex flex-col m-2 overflow-scroll h-[90%] p-4 bg-transparent">
        <Select
          title="School"
          options={SCHOOLS}
          field="school"
          user={user}
          setUser={setUser}
          editable={edit}
        />
        <Select
          title="Major"
          options={MAJORS}
          field="major"
          user={user}
          setUser={setUser}
          editable={edit}
        />
        <Select
          title="Grade"
          options={GRADES}
          field="grade"
          user={user}
          setUser={setUser}
          editable={edit}
        />
        <Input
          name="phone"
          type="phone"
          title="Phone Number"
          value={user.phone}
          user={user}
          setUser={setUser}
          editable={edit}
        />
        <Select
          title="Age"
          options={AGES}
          field="age"
          user={user}
          setUser={setUser}
          editable={edit}
        />
        <Radio
          text="Gender"
          options={GENDERS}
          field="gender"
          user={user}
          setUser={setUser}
          editable={edit}
        />
        <Radio
          text="Shirt"
          options={SHIRTS}
          field="shirt"
          user={user}
          setUser={setUser}
          editable={edit}
        />
        <div>
          <p className="mb-1 font-semibold">Diet</p>
          {edit ? (
            DIETS.map((option, index) => (
              <Checkbox
                className="w-1/2"
                key={index}
                toggle={user.diet.includes(option)}
                text={option}
                onClick={() =>
                  user.diet.includes(option)
                    ? setUser({
                        ...user,
                        diet: user.diet.filter((diet) => diet !== option),
                      })
                    : setUser({
                        ...user,
                        diet: [...user.diet, option],
                      })
                }
                color="bg-hackathon-green-300"
              />
            ))
          ) : user.diet.length > 0 ? (
            user.diet.map((diet, index) => (
              <p className="pl-3 mb-1" key={index}>
                {diet}
              </p>
            ))
          ) : (
            <p className="pl-3 mb-1">No diet restrictions</p>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        {edit && (
          <Button color="green" size="xl" text="done" onClick={handleSave} />
        )}
        {!edit && (
          <Button color="green" size="xl" text="edit" onClick={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default User;
