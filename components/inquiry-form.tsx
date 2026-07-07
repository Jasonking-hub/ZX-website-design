"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  demandTypeOptions,
  industryOptions,
  productTypeOptions,
} from "@/data/resources";
import {
  type ContactFormValues,
  type SelectionFormValues,
  validateContactForm,
  validateSelectionForm,
} from "@/lib/form-validation";
import { cn } from "@/lib/cn";

type InquiryFormProps = {
  variant: "contact" | "selection";
};

type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  options?: string[];
  multiline?: boolean;
};

const contactFields: FieldConfig[] = [
  { name: "name", label: "姓名", placeholder: "如：张工" },
  { name: "company", label: "公司名称", placeholder: "请输入公司名称" },
  { name: "phone", label: "联系电话", type: "tel", placeholder: "请输入手机号码" },
  { name: "email", label: "邮箱", type: "email", placeholder: "请输入邮箱" },
  { name: "demandType", label: "需求类型", options: demandTypeOptions },
  { name: "industry", label: "应用行业", options: industryOptions },
  { name: "message", label: "需求描述", placeholder: "请描述负载、行程、速度、加速度、安装空间和应用场景", multiline: true },
];

const selectionFields: FieldConfig[] = [
  { name: "name", label: "姓名", placeholder: "如：张工" },
  { name: "company", label: "公司", placeholder: "请输入公司名称" },
  { name: "phone", label: "手机", type: "tel", placeholder: "请输入手机号码" },
  { name: "email", label: "邮箱", type: "email", placeholder: "请输入邮箱" },
  { name: "industry", label: "应用行业", options: industryOptions },
  { name: "load", label: "负载", placeholder: "如：2kg" },
  { name: "stroke", label: "行程", placeholder: "如：300mm" },
  { name: "speed", label: "速度 / 加速度要求", placeholder: "如：速度 2m/s，加速度 5G" },
  { name: "productType", label: "需要的产品类型", options: productTypeOptions },
  { name: "message", label: "备注", placeholder: "补充安装空间、节拍、图纸需求等信息", multiline: true },
];

function buildInitialValues(fields: FieldConfig[]) {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

export function InquiryForm({ variant }: InquiryFormProps) {
  const fields = variant === "contact" ? contactFields : selectionFields;
  const initialValues = useMemo(() => buildInitialValues(fields), [fields]);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitted, setSubmitted] = useState(false);

  function updateValue(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result =
      variant === "contact"
        ? validateContactForm(values as ContactFormValues)
        : validateSelectionForm(values as SelectionFormValues);

    setErrors(result.errors as Record<string, string | undefined>);
    setSubmitted(result.isValid);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[32px] border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => {
          const fieldId = `${variant}-${field.name}`;
          const error = errors[field.name];
          const commonClassName = cn(
            "mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink transition placeholder:text-ink/35",
            error ? "border-red-500" : "border-navy/12 focus:border-industrial",
          );

          return (
            <label key={field.name} htmlFor={fieldId} className={cn("block", field.multiline && "md:col-span-2")}>
              <span className="text-sm font-semibold text-navy">{field.label}</span>
              {field.options ? (
                <select
                  id={fieldId}
                  value={values[field.name] ?? ""}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  className={commonClassName}
                >
                  <option value="">请选择{field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.multiline ? (
                <textarea
                  id={fieldId}
                  value={values[field.name] ?? ""}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  rows={5}
                  className={commonClassName}
                />
              ) : (
                <input
                  id={fieldId}
                  type={field.type ?? "text"}
                  value={values[field.name] ?? ""}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className={commonClassName}
                />
              )}
              {error ? <span className="mt-2 block text-xs font-medium text-red-600">{error}</span> : null}
            </label>
          );
        })}
      </div>

      {submitted ? (
        <div className="mt-6 rounded-2xl border border-industrial/20 bg-blueprint px-4 py-3 text-sm font-medium text-navy">
          需求已记录演示，后续可接入真实提交接口。
        </div>
      ) : null}

      <button
        type="submit"
        className="mt-6 rounded-full bg-industrial px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy active:translate-y-px"
      >
        提交需求
      </button>
    </form>
  );
}
