import * as React from "react";
import * as styles from "./SubmitUrlTemplate.module.css";
import { Button, FormField, FormFieldInput, Heading4 } from "@gemeente-denhaag/components-react";
import { InputURL } from "@conduction/components/lib/components/formFields";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "react-query";
import { useGithub } from "../../../hooks/github";

interface SubmitUrlTemplateProps {
  title: string;
  placeholder: string;
  buttonLabel?: string;
}

export const SubmitUrlTemplate: React.FC<SubmitUrlTemplateProps> = ({ title, placeholder, buttonLabel }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);

  const queryClient = useQueryClient();
  const _useGithub = useGithub(queryClient);
  const postRepository = _useGithub.postRepository();

  const onSubmit = (data: any): void => {
    const payload = {
      repository: {
        ...data,
      },
    };
    postRepository.mutate({ payload });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  React.useEffect(() => {
    setLoading(postRepository.isLoading);
  }, [postRepository.isLoading]);

  return (
    <>
      <Heading4>{title}</Heading4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContent}>
          <FormField className={styles.formField}>
            <FormFieldInput className={styles.inputUrl}>
              <InputURL {...{ register, errors }} name="html_url" placeholder={placeholder} disabled={loading} />
            </FormFieldInput>
          </FormField>
          <div className={styles.sendButton}>
            <Button type="submit" icon={<FontAwesomeIcon icon={faPaperPlane} />} disabled={loading}>
              {buttonLabel ?? t("Send")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
