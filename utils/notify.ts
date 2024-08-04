import Swal from "sweetalert2";

export const MESSAGE_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
};

export const showMessage = (msg = "", type = "success") => {
  const toast: any = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    customClass: { container: "toast" },
  });
  toast.fire({
    icon: type,
    title: msg,
    padding: "10px 20px",
  });
};

export const showDeleteConfirmation = (message: string) => {
  return Swal.fire({
    title: "Warning!",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Submit",
  });
};
