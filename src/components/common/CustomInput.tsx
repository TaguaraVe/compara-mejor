import { UseFormRegister, DeepMap, FieldError } from 'react-hook-form';

interface CustomInputProps {
  name: keyof FormData;
  label: string;
  error?: DeepMap<FormData, FieldError>;
  register: UseFormRegister<FormData>;
  required?: boolean;
  placeholder?: string | null;
  type?: string | null;
}

export const CustomTextarea: React.FC<CustomInputProps> = ({
  name,
  label,
  error,
  register,
  required,
  placeholder,
}) => {
  return (
    <div className="relative py-0  mx-auto mb-4 flex flex-col md:pt-6">
      <textarea
        {...register(name)}
        placeholder={placeholder}
        cols={30}
        rows={2}
        className={`px-2 py-1 rounded-lg border-2 border-transparent outline-0 focus:border-2 focus:border-myBlue ${
          error?.message
            ? 'outline-2 outline-red-500 border-2 border-red-500'
            : ''
        } `}
      ></textarea>
      {error != null && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  error,
  register,
  required,
  placeholder,
  type = 'text',
}) => {
  return (
    <div className="relative mb-6 flex h-20 flex-col text-left">
      <label htmlFor={name as string}>{label}</label>
      <input
        id={name as string}
        {...register(name)}
        placeholder={placeholder}
        type={type}
        className="focus:border-b-6 border-b-4 border-blue-300 bg-white py-2  outline-0 focus:border-blue-500 px-2"
      />
      {error != null && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
