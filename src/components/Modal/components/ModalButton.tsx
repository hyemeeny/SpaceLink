import CtaButton from "@/components/Button/CtaButton";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ModalButton {
  isValid: boolean;
  isSubmitting: boolean;
  label: string;
}

export const Button = ({ isValid, label, isSubmitting }: ModalButton) => {
  return (
    <CtaButton type="submit" disabled={!isValid || isSubmitting}>
      {isSubmitting ? <LoadingSpinner /> : label}
    </CtaButton>
  );
};
