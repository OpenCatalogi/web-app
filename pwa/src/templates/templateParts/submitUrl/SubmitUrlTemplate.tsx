import * as React from "react";
import * as styles from "./SubmitUrlTemplate.module.css";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "react-query";
import { useGithub } from "../../../hooks/github";
import { Button } from "@utrecht/component-library-react";
import { FormField, Textbox, Heading } from "@utrecht/component-library-react/dist/css-module";

interface SubmitUrlTemplateProps {
  title: string;
  placeholder: string;
  buttonLabel?: string;
}

export const SubmitUrlTemplate: React.FC<SubmitUrlTemplateProps> = ({ title, placeholder, buttonLabel }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formIsError, setFormIsError] = React.useState<boolean>(false);

  const queryClient = useQueryClient();
  const _useGithub = useGithub(queryClient);
  const postRepository = _useGithub.postRepository();

  const onSubmit = (data: any): void => {
    const payload = {
      repository: {
        html_url: data.html_url.trim(),
      },
    };
    postRepository.mutate({ payload });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const watchInputUrl = watch("html_url");
  React.useEffect(() => {
    setLoading(postRepository.isLoading);
  }, [postRepository.isLoading]);

  React.useEffect(() => {
    setFormIsError(postRepository.isError);
  }, [postRepository.isError]);

  return (
    <div className={styles.container}>
      <Heading level={4}>{title}</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContent}>
          <FormField className={styles.formField}>
            <Textbox
              id="submitUrlTextBox"
              {...register("html_url")}
              invalid={errors["html_url"]}
              placeholder={t(placeholder)}
              disabled={loading}
              type="url"
            />
            {formIsError && (
              <span className={styles.customErrorMessage}>
                {t(
                  "Oops, something went wrong. Please make sure you're using a valid repository URL or try again later.",
                )}
              </span>
            )}
          </FormField>

          <Button className={styles.submitButton} type="submit" disabled={loading || !watchInputUrl}>
            <FontAwesomeIcon icon={faPaperPlane} />
            {buttonLabel ?? t("Send")}
          </Button>
        </div>
      </form>
    </div>
  );
};
