import { useState } from "react";
import Modal from "../components/Modal";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Button from "../components/Button";

export default function Test({prod_id, prod_image_url,prod_title, prod_price,prod_old_price, prod_desc}) {
  const [open, setOpen] = useState(false);
  return (
    <main className="App">
      <button className="btn btn-danger" onClick={() => setOpen(true)}>
        <Trash2 /> Delete
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex gap-8 w-[800px]">
          <div className="h-[300px] w-[300px] flex-shrink-0">
            <img
              className="h-full w-full object-cover rounded-md"
              src="https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-5">
            <p className="text-2xl text-black font-bold">{prod_title}</p>
            <p className="text-lg text-gray-600 ">
             {prod_desc}
            </p>
            <p className="text-lg text-gray-600 font-bold">
              prod specs
            </p>

            <div className="flex gap-2">
            <p className="text-lg text-black font-bold">
              {prod_price}
            </p>

            <p className="text-lg text-black font-bold"><s>
            {prod_old_price}
              </s></p>
            </div>
            </div>

            <div className="">
            <div className="flex gap-2">
            <Button>
              <div className="flex items-center justify-center">
                <Heart/>
              </div>
              <p>Add to Wishlist</p>
            </Button>
            <Button>
              <ShoppingCart/>
              <p>Add to Cart</p>
            </Button>
            </div>
            </div>

          </div>


          
        </div>

        
      </Modal>
    </main>
  );
}
