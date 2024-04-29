import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, Input, Tinymce } from "./components";
import postServices from "../Appwrite/Posts";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      description: post?.description || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  //Function for Uploading post and edit post
  async function submit(data) {
    if (post) {
      const file = data.image[0]
        ? await postServices.uploadImage(data.image[0])
        : null;
      if (file) {
        postServices.deleteImage(post.featuredImage);
      }

      const dbPost = await postServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await postServices.uploadImage(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log({...data})
        const dbPost = await postServices.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string") {
      const trimVal = value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
      return trimVal
    }

    return "";
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <div className="w-full text-center pt-5 text-4xl font-bold">
        <h1>{post ? "Edit Post" : "New Post"}</h1>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap w-full items-center justify-center py-5"
      >
        <div className="p-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <Input
              label="Title: "
              placeholder="Enter Title"
              className=""
              {...register("title", {
                required: true,
                maxLength: {
                  value: 36,
                  message: `Title should be less than 36 character`,
                },
              })}
              required={true}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            {errors.title && <p className="text-red-500 text-sm pl-5">{errors.title.message}</p>}
          </div>
          <Input
            label="Slug: "
            placeholder="Slug"
            className=""
            {...register("slug", { required: true })}
            disabled={true}
          />
          <div className="flex flex-col gap-1">
            <Input
              label="Description: "
              placeholder="description"
              className=""
              {...register("description", {
                required: true,
                maxLength: {
                  value: 300,
                  message: "Description should be less than 300 character",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm pl-5">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              label="Head Image"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full h-40">
                <img src={postServices.getFilePreview(post.featuredImage)} />
              </div>
            )}
          </div>
          <Tinymce
            className={"sm:col-span-2"}
            label="Content: "
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-7 ">
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className=""
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
