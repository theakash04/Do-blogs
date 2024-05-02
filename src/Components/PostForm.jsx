import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  ButtonJS,
  Container,
  Input,
  Loading,
  Tinymce,
  ImageUPload,
} from "./components";
import postServices from "../Appwrite/Posts";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function PostNav({ Title }) {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 w-full">
        <div className="font-semibold text-lg">
          {Title ? "Edit Post" : "Create Post"}
        </div>
        <Link to={"/"}>
          <CloseIcon />
        </Link>
      </div>
    </>
  );
}

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

  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if(post){
      const arr = post.tag.split(',');
      setTags(arr);
    }
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const changeLoadState = () => setLoad((prev) => !prev);

  //Function for Uploading post and edit post
  async function submit(data) {
      try {
        changeLoadState();
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
            const tag = integrateArrayElem(tags)
            const fileId = file.$id;
            data.featuredImage = fileId;
            const dbPost = await postServices.createPost({
              ...data,
              userId: userData.$id,
              tag
            });
            if (dbPost) {
              navigate(`/post/${dbPost.$id}`);
            }
          }
        }
        changeLoadState();
      } catch (error) {
        changeLoadState();
        console.log(error);
      }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string") {
      const trimVal = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
      return trimVal;
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

  //integrating array element
  function integrateArrayElem(array){
    const endIndex = array.length > 4 ? 3 : array.length - 1;
    const integrateString = array.slice(0, endIndex + 1).join(",");

    return integrateString
  }

  // handling tags input
  function handleInputChange(e) {
    setTagInput(e.target.value);
  }

  function addTag() {
    if (tagInput.trim() !== "" && !tags.includes(tagInput)) {
      const hasTag = "#" + tagInput
      setTags([...tags, hasTag.trim()]);
      setTagInput("");
    }
  }

  function removeTag(tagToRemove) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }



  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div className="max-w-[1180px] mx-auto w-full">
          <PostNav Title={post} />

          {/* form box */}
          <div className="max-w-[1000px] p-3 w-full mx-auto">
            <div className="bg-white rounded-md p-5 w-full">
              <form onSubmit={handleSubmit(submit)} className="grid w-full">
                <div className="">
                  <div className="grid gap-5">
                    <div className="relative group transition-all">
                      <Input
                        type="file"
                        label="Add a cover Image"
                        accept="image/png, image/jpg, image/jpeg"
                        {...register("image", { required: !post })}
                        // onChange={Imageupload}
                        className="border-none bg-white shadow-none"
                      />
                      <span className="bg-black/70 px-2 py-4 group-hover:block hidden text-white absolute group-hover:-bottom-14 rounded-md -left-3 transition-all text-xs">
                        Use a ratio of 1000:420 for best results
                      </span>
                    </div>

                    <div>
                      <Input
                        placeholder="Post Title here..."
                        className="border-none text-3xl placeholder:text-gray-700 font-semibold bg-white shadow-none"
                        {...register("title", {
                          required: true,
                          maxLength: {
                            value: 36,
                            message: `Title should be less than 36 character`,
                          },
                        })}
                        required={true}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm pl-5">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ">
                      <ul className="flex gap-4">
                        {tags.map((tag, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-1 border px-2 py-1 rounded-lg bg-gray-100 "
                          >
                            <span>{tag}</span>
                            <button
                              onClick={() => removeTag(tag)}
                              type="button"
                            >
                              <CloseIcon
                                sx={{ color: "red", fontSize: "18px" }}
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <Input
                        type="text"
                        placeholder="Add up to 4 tag..."
                        value={tagInput}
                        onChange={handleInputChange}
                        className="border-none text-lg bg-white shadow-none"
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="A short description here...."
                        className="border-none bg-white text-xl pl-5 placeholder:text-gray-500 w-full outline-none resize-none mt-3"
                        rows={5}
                        {...register("description", {
                          required: true,
                          maxLength: {
                            value: 300,
                            message:
                              "Description should be less than 300 character",
                          },
                        })}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm pl-5">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Tinymce
                      className={"sm:col-span-2"}
                      // label="Content: "
                      name="content"
                      control={control}
                      defaultValue={getValues("content")}
                    />
                  </div>

                  <div className="pt-5 px-2">
                    <ButtonJS
                      type="submit"
                      className=""
                      color={post ? "success" : undefined}
                      children={post ? "Update" : "Submit"}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostForm;
