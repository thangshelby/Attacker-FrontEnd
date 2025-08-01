import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIdentityProfile } from "@/hooks/useIdentityProfile";

const registerSchema = z.object({
  image: z.string(),
  name: z.string().min(1, { message: "Public Name is required" }),
  description: z.string().optional(),
  did: z.string().length(34, { message: "Not valid DID" }),
  method: z.enum(["key", "cheqd", "web"]),
});

const Step1 = () => {
  const uploadImageRef = React.useRef(null);
  const [selectedMethod, setSelectedMethod] = React.useState("");
  const { createIdentityProfile } = useIdentityProfile();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // submit logic here
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    console.log("Uploaded file:", file);
    if (file) {
      setValue("image", file.name);
      console.log("Image uploaded:", register("image").value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-center justify-center"
    >
      <div className="grid w-[60%] gap-2 2xl:gap-4">
        {/* Upload Image */}
        <div className="flex items-center justify-center">
          {register("image").value ? (
            <img
              src={"../../assets/images/" + register("image").value} // Assuming logo is a static image path or URL
              // src={`../../../../${register("image").value}`}
              alt="Uploaded"
              className="rounded-full object-cover sm:h-16 sm:w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24"
            />
          ) : (
            <button
              type="button"
              onClick={() => uploadImageRef.current.click()}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-full border border-gray-200 p-4 hover:bg-gray-50 2xl:p-6"
            >
              <ImagePlus className="text-gray-600 xl:h-8 xl:w-8" />
            </button>
          )}

          <input
            type="file"
            accept="image/*"
            ref={uploadImageRef}
            onChange={handleUploadImage}
            className="hidden"
          />
        </div>

        <div className="flex flex-row gap-6 xl:flex-col xl:gap-2 2xl:gap-4">
          {/* Name */}
          <div className="xl grid w-full flex-1 gap-1 2xl:gap-3">
            <Label
              className="text-[10px] font-semibold text-gray-800 xl:text-xs 2xl:text-base"
              htmlFor="name"
            >
              Public Name
            </Label>
            <Input
              id="name"
              className={`outline-none focus:ring focus:ring-indigo-300`}
              placeholder="University Degree"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 xl:text-xs 2xl:text-base">
                {errors.name.message}
              </span>
            )}
          </div>
          {/* Method */}
          <div className="xl grid flex-1 gap-1 2xl:gap-3">
            <Label
              className="text-[10px] font-semibold text-gray-800 xl:text-xs 2xl:text-base"
              htmlFor="method"
            >
              Method
            </Label>
            <Select
              onValueChange={(value) => {
                setSelectedMethod(value);
                setValue("method", value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="key">Key</SelectItem>
                <SelectItem value="cheqd">Cheqd</SelectItem>
                <SelectItem value="web">Web</SelectItem>
              </SelectContent>
            </Select>
            {errors.method && (
              <span className="text-red-500 xl:text-xs 2xl:text-base">
                {errors.method.message}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="xl grid gap-1 2xl:gap-3">
          <Label
            className="text-[10px] font-semibold text-gray-800 xl:text-xs 2xl:text-base"
            htmlFor="description"
          >
            Description (Optional)
          </Label>
          <Textarea
            id="description"
            placeholder="This code will be inserted in the code of every credential you issued."
            className="h-12 2xl:h-24"
            {...register("description")}
          />
        </div>

        {/* DID */}
        <div className="xl grid gap-1 2xl:gap-3">
          <Label
            className="text-[10px] font-semibold text-gray-800 xl:text-xs 2xl:text-base"
            htmlFor="did"
          >
            DID
          </Label>
          <Input id="did" placeholder="did:cheqd:123..." {...register("did")} />
          {errors.did && (
            <span className="text-red-500 xl:text-xs 2xl:text-base">
              {errors.did.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step1;
