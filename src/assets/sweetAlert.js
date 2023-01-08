import { SHOW_ALL } from "rc-tree-select";
import Swal from "sweetalert2";

export const AlertSuccess = (text) => {
    Swal.fire({
        icon: 'success',
        title: 'Good Job',
        text: text,
    });
}

export const AlertError = (text) => {
    Swal.fire({
        icon: 'warning',
        title: 'Error!',
        text: text
    })
}

export const AlertConfirm = (props) => {
    Swal.fire({
        icon: 'question',
        title: props.title,
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: props.confirmText,
        preConfirm: props.preConfirm
    })
}