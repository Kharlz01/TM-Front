import { useState } from "react";
import { useParams } from "react-router-dom";
import imagePaths from "../../Shared/domain/imagePath";

const ChangePhoto = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { id } = useParams();

  const handleImageSelection = (path: string) => {
    setSelectedImage(path);
  };

  const url = import.meta.env.VITE_BACK_URL;

  const handleSave = async () => {
    try {

      const endpoint = `${url}/users/settings/${id}`;
      const request = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      const response = await request.json();

      if ("success" in response && response.success) {
        window.location.href = "/.";
      } else {
        console.error("Error al cargar la imagen");
      }
    } catch (error) {
      console.error("Ocurrio un error: ", error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Elige tu nueva foto de perfil:
      </h2>
      <div className="flex flex-wrap">
        {imagePaths.map((path, index) => (
          <img
            key={index}
            src={path}
            alt={`Perfil ${index + 1}`}
            className={`w-24 h-24 m-2 md:w-32 md:h-32 object-cover rounded-full cursor-pointer border-4 ${
              selectedImage === path ? "border-violet-500" : "border-transparent"
            }`}
            onClick={() => handleImageSelection(path)}
          />
        ))}
      </div>
      <button
        className={`mt-4 py-2 px-4 rounded ${
          selectedImage
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-500 cursor-not-allowed"
        } text-white font-bold`}
        onClick={handleSave}
        disabled={!selectedImage}
      >
        Guardar
      </button>
    </div>
  );
};

export default ChangePhoto;
