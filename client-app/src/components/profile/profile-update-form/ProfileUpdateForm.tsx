import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import { TextInput, TextArea } from "../../form";
import { IProfile } from "../../../models/profile";
import { IUpdateProfileForm } from "../../../models/updateProfileForm";
import { combineValidators, isRequired } from "revalidate";

interface IProps {
  profile: IProfile;
  updating: boolean;
  updateProfile: (form: IUpdateProfileForm) => Promise<void>;
  setEditMode: (mode: boolean) => void;
}

const validate = combineValidators({
  displayName: isRequired("Display name")
});

const ProfileUpdateForm: React.FC<IProps> = ({
  profile,
  updating,
  updateProfile,
  setEditMode
}) => {
  const handleFormSubmit = (form: IUpdateProfileForm) => {
    updateProfile(form).then(() => setEditMode(false));
  };

  const form: IUpdateProfileForm = {
    bio: profile.bio,
    displayName: profile.displayName
  };

  return (
    <FinalForm
      validate={validate}
      initialValues={form}
      onSubmit={handleFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Field
              placeholder="Display name"
              name="displayName"
              component={TextInput}
              value={form.displayName}
            />
            <Field
              placeholder="Bio"
              name="bio"
              component={TextArea}
              rows={2}
              value={form.bio}
            />
            <Button
              floated="right"
              disabled={updating || invalid || pristine}
              positive
              type="submit"
              loading={updating}
              content="Submit"
            />
          </Form>
        );
      }}
    />
  );
};

export default ProfileUpdateForm;
