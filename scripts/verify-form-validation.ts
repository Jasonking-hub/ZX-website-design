import { validateContactForm, validateSelectionForm } from "../lib/form-validation";

const invalidContact = validateContactForm({
  name: "",
  company: "",
  phone: "123",
  email: "bad-email",
  demandType: "",
  industry: "",
  message: "",
});

if (!invalidContact.errors.name || !invalidContact.errors.phone || !invalidContact.errors.email || invalidContact.isValid) {
  throw new Error("Contact validation did not catch required, phone, and email errors");
}

const validContact = validateContactForm({
  name: "张工",
  company: "深圳测试设备有限公司",
  phone: "15973130940",
  email: "21711708@qq.com",
  demandType: "选型咨询",
  industry: "半导体检测",
  message: "负载 2kg，行程 300mm，需要确认直线电机型号。",
});

if (!validContact.isValid || Object.keys(validContact.errors).length !== 0) {
  throw new Error("Valid contact form should pass");
}

const invalidSelection = validateSelectionForm({
  name: "",
  company: "",
  phone: "",
  email: "bad-email",
  industry: "",
  load: "",
  stroke: "",
  speed: "",
  productType: "",
  message: "",
});

if (!invalidSelection.errors.load || !invalidSelection.errors.stroke || !invalidSelection.errors.productType || invalidSelection.isValid) {
  throw new Error("Selection validation did not catch engineering fields");
}

console.log("verify-forms: validation rules pass");
