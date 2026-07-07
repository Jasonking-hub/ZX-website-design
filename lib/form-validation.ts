export type ContactFormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  demandType: string;
  industry: string;
  message: string;
};

export type SelectionFormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  industry: string;
  load: string;
  stroke: string;
  speed: string;
  productType: string;
  message: string;
};

export type FormValidationResult<T extends Record<string, string> = Record<string, string>> = {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
};

const phonePattern = /^1[3-9]\d{9}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasValue(value: string): boolean {
  return value.trim().length > 0;
}

function validateShared(values: Pick<ContactFormValues, "name" | "company" | "phone" | "email" | "industry">) {
  const errors: Partial<Record<keyof typeof values, string>> = {};

  if (!hasValue(values.name)) errors.name = "请填写姓名。";
  if (!hasValue(values.company)) errors.company = "请填写公司名称。";
  if (!hasValue(values.phone)) {
    errors.phone = "请填写联系电话。";
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "请填写有效的中国大陆手机号码。";
  }
  if (!hasValue(values.email)) {
    errors.email = "请填写邮箱。";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "请填写有效的邮箱地址。";
  }
  if (!hasValue(values.industry)) errors.industry = "请选择应用行业。";

  return errors;
}

export function validateContactForm(values: ContactFormValues): FormValidationResult<ContactFormValues> {
  const errors: FormValidationResult<ContactFormValues>["errors"] = {
    ...validateShared(values),
  };

  if (!hasValue(values.demandType)) errors.demandType = "请选择需求类型。";
  if (!hasValue(values.message)) errors.message = "请填写需求描述。";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateSelectionForm(values: SelectionFormValues): FormValidationResult<SelectionFormValues> {
  const errors: FormValidationResult<SelectionFormValues>["errors"] = {
    ...validateShared(values),
  };

  if (!hasValue(values.load)) errors.load = "请填写负载信息。";
  if (!hasValue(values.stroke)) errors.stroke = "请填写行程信息。";
  if (!hasValue(values.speed)) errors.speed = "请填写速度或加速度要求。";
  if (!hasValue(values.productType)) errors.productType = "请选择需要的产品类型。";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
