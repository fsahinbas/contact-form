"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useState } from "react";

const schema = z.object({
  firstName: z.string().min(1, { message: "This field is required" }),
  lastName: z.string().min(1, { message: "This field is required" }),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Please enter a valid email address" }),
  queryType: z.enum(["generalEnquiry", "supportRequest"], {
    message: "Please select a query type",
  }),
  message: z.string().min(1, { message: "This field is required" }),
  consent: z
    .boolean()
    .refine(
      (value) => value === true,
      "To submit this form, please consent to being contacted"
    ),
});

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const onSubmit = (data: any) => {
    console.log(data);
    setIsSubmitted(true);
    reset();
    setFormData(data);
  };
  return (
    <>
      {isSubmitted && (
        <div className="thanks">
          <div className="header">
            <Image
              src={"/assets/images/icon-success-check.svg"}
              alt="success"
              width={24}
              height={24}
            />
            <p className="title body-m-bold">Message Sent!</p>
          </div>
          <p className="body-s">
            Thanks for completing the form. We’ll be in touch soon!
          </p>
        </div>
      )}

      <main>
        <h1 className="heading">Contact Us</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
              <label htmlFor="firstName">
                First Name <span className="body-s">*</span>
              </label>
              <input
                {...register("firstName")}
                id="firstName"
                className="form-control"
              />
              {errors.firstName?.message && (
                <span className="error body-s">
                  {errors.firstName?.message.toString()}
                </span>
              )}
            </div>
            <div className="col">
              <label htmlFor="lastName">
                Last Name <span className="body-s">*</span>
              </label>
              <input
                {...register("lastName")}
                id="lastName"
                className="form-control"
              />
              {errors.lastName?.message && (
                <span className="error body-s">
                  {errors.lastName?.message.toString()}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="email">
                Email Address <span className="body-s">*</span>
              </label>
              <input
                {...register("email")}
                id="email"
                className="form-control"
              />
              {errors.email?.message && (
                <span className="error body-s">
                  {errors.email?.message.toString()}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="queryType">
                Query Type <span className="body-s">*</span>
              </label>

              <div className="row" style={{ marginBottom: "0" }}>
                <div className="radio form-control">
                  <input
                    id="generalEnquiry"
                    type="radio"
                    className="form-control"
                    {...register("queryType")}
                    value={"generalEnquiry"}
                  />
                  <label htmlFor="generalEnquiry" className="lbl-radio">
                    General Enquiry
                  </label>
                </div>
                <div className="radio form-control">
                  <input
                    id="supportRequest"
                    type="radio"
                    {...register("queryType")}
                    className="form-control"
                    value={"supportRequest"}
                  />
                  <label htmlFor="supportRequest" className="lbl-radio">
                    Support Request
                  </label>
                </div>
              </div>
              {errors.queryType?.message && (
                <span className="error body-s">
                  {errors.queryType?.message.toString()}
                </span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="message">
                Message <span className="body-s">*</span>
              </label>
              <textarea
                rows={5}
                className="form-control"
                {...register("message")}
                id="message"
              />
              {errors.message?.message && (
                <span className="error body-s">
                  {errors.message?.message.toString()}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <input type="checkbox" id="consent" {...register("consent")} />
                <label htmlFor="consent" className="lbl-chk">
                  I consent to being contacted by the team{" "}
                  <span className="body-s">*</span>
                </label>
              </div>
              {errors.consent?.message && (
                <span className="error body-s">
                  {errors.consent?.message.toString()}
                </span>
              )}
            </div>
          </div>
          <button type="submit" className="body-m-bold">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default ContactUsPage;
