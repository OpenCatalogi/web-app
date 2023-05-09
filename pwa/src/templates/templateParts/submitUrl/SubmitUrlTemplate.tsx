import * as React from "react";
import * as styles from "./SubmitUrlTemplate.module.css";
import { Button, FormField, FormFieldInput, Heading4 } from "@gemeente-denhaag/components-react";
import { InputURL } from "@conduction/components/lib/components/formFields";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface SubmitUrlTemplateProps {
  title: string;
  formId: string;
  placeholder: string;
}

export const SubmitUrlTemplate: React.FC<SubmitUrlTemplateProps> = ({ title, formId, placeholder }) => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Heading4>{title}</Heading4>

      <div className={styles.formContent}>
        <FormField className={styles.formField}>
          <FormFieldInput className={styles.inputUrl}>
            <InputURL {...{ register, errors }} name="url" placeholder={placeholder} />
          </FormFieldInput>
        </FormField>
        <div className={styles.sendButton}>
          <Button form={formId} icon={<FontAwesomeIcon icon={faPaperPlane} />}>
            {t("Send")}
          </Button>
        </div>
      </div>
    </>
  );
};
