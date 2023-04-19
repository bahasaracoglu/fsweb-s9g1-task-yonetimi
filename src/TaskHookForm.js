import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

const TaskHookForm = ({ kisiler, submitFn, toast }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });

  function myHandleSubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    console.log(data);
  }

  console.log("hatalar", errors);
  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(myHandleSubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            {...register("title", {
              required: "Task başlığı yazmalısınız",
              minLength: {
                value: 3,
                message: "Task başlığı en az 3 karakter olmalı",
              },
            })}
            type="text"
          />{" "}
          {errors.title && (
            <p className="input-error">{errors.title.message}</p>
          )}
        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            {...register("description", {
              required: "Task açıklaması yazmalısınız",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakter olmalı",
              },
            })}
          ></textarea>
          {errors.description && (
            <p className="input-error">{errors.description.message}</p>
          )}
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  {...register("people", {
                    required: "Lütfen en az bir kişi seçin",
                    max: {
                      value: 3,
                      message: "En fazla 3 kişi seçebilirsiniz",
                    },
                  })}
                  value={p}
                />
                {p}
              </label>
            ))}
          </div>
          {errors.people && (
            <p className="input-error">{errors.people.message}</p>
          )}
        </div>

        <div className="form-line">
          <button className="submit-button" type="submit" disabled={!isValid}>
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskHookForm;
