import { useToast } from "vue-toast-notification";

const toast = useToast({
    position: 'bottom-left',
    duration: 5000,
    pauseOnHover: true,
})

export default toast