import { SignUpService } from "@api/UserServices";
import { SignUpParams, SignUpResponse } from "@utils/types/User";
import { Fn } from "@utils/types/helpTypes";

export async function uploadWithPicture(
  sourceUrl: string | undefined,
  params: SignUpParams,
  onSuccess: (data: SignUpResponse) => void,
  onError: (err: string) => void
) {
  // first get our hands on the local file

  if (!sourceUrl) {
    console.log("No source url");
    const formData = new FormData();
    formData.append("nombre", params.nombre);
    formData.append("correo", params.correo);
    formData.append("contrasena", params.contrasena);
    formData.append("contrasenaConfirmada", params.contrasenaConfirmada);

    console.log({ ...params });

    SignUpService(formData)
      .then((res) => {
        if (!res.data || !res.ok) {
          onError(res.message);
          return;
        }
        onSuccess(res.data);
      })
      .catch((err) => {
        console.log({ err });
        onError(err.message);
      });
    return;
  }

  const localFile = await fetch(sourceUrl).catch((err) => {
    console.log({ err });
  });
  console.log({ localFile });

  if (!localFile || !localFile.blob) {
    console.log("No local file found");
    return;
  }

  // then create a blob out of it (only works with RN 0.54 and above)
  const fileBlob = await localFile.blob();
  console.log({ fileBlob });

  if (!fileBlob) {
    console.log("No blob created");
    return;
  }

  const formData = new FormData();
  formData.append("nombre", params.nombre);
  formData.append("correo", params.correo);
  formData.append("contrasena", params.contrasena);
  formData.append("contrasenaConfirmada", params.contrasenaConfirmada);
  formData.append("pfp", fileBlob);

  console.log({ ...params, pfp: fileBlob });
  // return;

  SignUpService(formData)
    .then((res) => {
      if (!res.data || !res.ok) {
        onError(res.message);
        return;
      }
      onSuccess(res.data);
    })
    .catch((err) => {
      console.log({ err });
      onError(err.message);
    });
}
