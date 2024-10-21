import { BsPalette, BsCpu, BsTools, BsCloud } from "react-icons/bs";
export const DomainQueryIcons = {
    front_end:<BsPalette className='mx-2'/>,
    back_end:<BsCpu className='mx-2'/>,
    cloud:<BsTools className='mx-2'/>,
    devops:<BsCloud className='mx-2'/>
}
export const loadScript = (src, id) => {
    return new Promise((resolve) => {
      if (document.getElementById(id)) {
        console.log('Razorpay script already loaded');
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };