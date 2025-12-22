import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import rightArrow from "../../../assets/rightArrow.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IRecipeForm {
  name: string;
  price: string;
  description: string;
  categoriesIds: string;
  tagId: string;
  recipeImage: FileList;
  id: string;
}

export default function RecipeData() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRecipeForm>();

  const appendToFormdata = (data: IRecipeForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    if (data.recipeImage && data.recipeImage[0]) {
      formData.append("recipeImage", data.recipeImage[0]);
    }
    return formData;
  };

  const onSubmit = async (data: IRecipeForm) => {
    const recipeData = appendToFormdata(data);
    try {
      await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Recipe added successfully");
      navigate("/dashboard/recipes");
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { message: string };
      toast.error(errorData?.message || "An unknown error occurred.");
    }
  };

  useEffect(() => {
    const fetchSelectData = async () => {
      const authHeader = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      try {
        const [catRes, tagRes] = await Promise.all([
          axios.get(
            "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
            authHeader
          ),
          axios.get(
            "https://upskilling-egypt.com:3006/api/v1/tag/",
            authHeader
          ),
        ]);
        setCategories(catRes.data.data || []);
        setTags(tagRes.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchSelectData();
  }, []);

  return (
    <>
      <div className="py-1 m-2 dash-container rounded-4 d-flex justify-content-between align-items-center bg-light">
        <div className="p-5">
          <h4>
            Fill the <span className="text-success">Recipes</span>
          </h4>
          <p>Easily manage your meals using the form below.</p>
        </div>
        <div className="p-5">
          <button
            className="btn btn-success px-5"
            onClick={() => navigate("/dashboard/recipes")}
          >
            Fill Recipes <img src={rightArrow} alt="arrow" />
          </button>
        </div>
      </div>

      <form className="w-75 p-5 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Recipe name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <div className="text-danger small">{errors.name.message}</div>
        )}

        <select
          className="form-control my-2"
          {...register("tagId", { required: "Tag is required" })}
        >
          <option value="">Select Tag</option>
          {tags.map((tag:IRecipeForm) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.tagId && (
          <div className="text-danger small">{errors.tagId.message}</div>
        )}

        <input
          type="number"
          className="form-control my-2"
          placeholder="Recipe price"
          {...register("price", { required: "Price is required" })}
        />
        {errors.price && (
          <div className="text-danger small">{errors.price.message}</div>
        )}

        <select
          className="form-control my-2"
          {...register("categoriesIds", { required: "Category is required" })}
        >
          <option value="">Select Category</option>
          {categories.map((cat:IRecipeForm) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoriesIds && (
          <div className="text-danger small">
            {errors.categoriesIds.message}
          </div>
        )}

        <textarea
          rows={4}
          className="form-control my-2"
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && (
          <div className="text-danger small">{errors.description.message}</div>
        )}

        <input
          type="file"
          className="form-control my-2"
          {...register("recipeImage", { required: "Image is required" })}
        />
        {errors.recipeImage && (
          <div className="text-danger small">{errors.recipeImage.message}</div>
        )}

        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-outline-success me-5"
            onClick={() => navigate("/dashboard/recipes")}
          >
            Cancel
          </button>
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
