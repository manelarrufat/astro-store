
import { ImageUpload } from "@/utils/image-upload";
import { defineAction } from "astro:actions";
import { db, eq, ProductImage } from "astro:db";
import { z } from "astro:schema";
import { getSession } from "auth-astro/server";

export const deleteProductImage = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async(imageId, {request}) => {

        const session = await getSession( request );
        const user = session?.user;

        if (!user || user.role != 'admin') {
            throw new Error('Unauthorized');
        }

        const [ productImage ] = await db
          .select()
          .from(ProductImage)
          .where(eq(ProductImage.id, imageId));

          
        if (!productImage) {
            throw new Error(`Image with id ${imageId} not found`);
        }

        const deleted = await db
          .delete(ProductImage)
          .where(eq(ProductImage.id, imageId));

          console.log('Deleted', deleted);

        // borrar de Cloudinary
        if (productImage.image.includes('http')) {
            console.log(productImage.image)
            await ImageUpload.delete(productImage.image);
            console.log('Borrat a Cloudinary')
        }
            
        return { ok: true };
    },
});