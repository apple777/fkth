import { z } from 'zod';

export const localizedStringSchema = z.object({
  he: z.string().min(1),
  en: z.string().min(1)
});

export const mapPoiSchema = z.object({
  id: z.string().min(1),
  coordinates: z.tuple([z.number(), z.number()]), // [lng, lat]
  stone_title: localizedStringSchema,
  vr_360_url: z.string().url(),
  vr_title: localizedStringSchema,
  vr_hotspot: z.object({
    hotspot_img_url: z.string().url(),
    hotspot_title: localizedStringSchema
  })
});
export type MapPOI = z.infer<typeof mapPoiSchema>;

export const carouselItemSchema = z.object({
  id: z.number().int().nonnegative(),
  years_range: z.string().min(1),
  title_default: localizedStringSchema,
  title_hover: localizedStringSchema,
  title_toggle: localizedStringSchema,
  image_assets: z.object({
    url_thumb: z.string().url(),
    url_large: z.string().url(),
    alt_text: z.object({ en: z.string().min(1) })
  }),
  media_assets: z.object({
    voiceover_url: z.string().url().optional(),
    text_content_id: z.string().min(1).optional(),
    video_url: z.string().url().optional()
  }),
  related_photos_array: z.array(z.string().url()).default([])
});
export type CarouselItem = z.infer<typeof carouselItemSchema>;

export const collectionSchema = z.object({
  collection_id: z.string().min(1),
  title: localizedStringSchema,
  years_range: z.string().min(1),
  film_item_references: z.array(z.union([z.string(), z.number()])).default([])
});
export type Collection = z.infer<typeof collectionSchema>;
