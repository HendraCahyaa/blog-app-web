// src/components/ChangePasswordForm.tsx
import { useChangePasswordMutation } from "@/hooks/api/post/auth/useChangePassword";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "@/schemas/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
function ChangePasswordPage() {
  const { mutate, isPending } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  function onSubmit(data: ChangePasswordSchema) {
    mutate(data);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Ubah Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Password Lama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Lama
          </label>
          <input
            type="password"
            {...register("oldPassword")}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.oldPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* Password Baru */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Baru
          </label>
          <input
            type="password"
            {...register("newPassword")}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.newPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-2 rounded-md font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isPending ? "Memproses..." : "Simpan Password"}
        </button>
      </form>
    </div>
  );
}
export default ChangePasswordPage;
