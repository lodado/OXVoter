import NextImage from 'next/image'
import { ComponentProps } from 'react'
import { preload, PreloadOptions } from "react-dom";

/**
 * Interface for the properties of a image component.
 *
 * Defines the structure for the properties passed to a image component,
 * including required properties `src` and `alt` for the image source URL and
 * alternative text, respectively. Optional properties `width` and `height`
 * can be provided to specify the dimensions of the image.
 *
 * @interface
 * @property {string} src - The URL of the image to display. This is a required property.
 * @property {string} alt - A text description of the image for accessibility. This is a required property.
 * @property {number} [width] - The width of the image in pixels. This is an optional property.
 * @property {number} [height] - The height of the image in pixels. This is an optional property.
 */
export interface ImageProps extends ComponentProps<typeof NextImage> {
  src: string;
  alt: string;
  width?: number;
  height?: number;

  isPreload?: boolean;
  preloadOptions?: PreloadOptions;
}
/**
 * `Image` is a wrapper component around Next.js's `Image` component,
 * designed to simplify the handling of image sources, typically from Storage,
 * but it can be used with any image URL. It provides a way to include images in your application
 * with default dimensions or customized ones.
 *
 * Props:
 * - `src` (string): The source URL of the image. It is a required prop to display the image.
 * - `alt` (string): Textual description of the image for accessibility purposes. Also required.
 * - `width` (number, optional): The width of the image in pixels. Defaults to 500 if not specified.
 * - `height` (number, optional): The height of the image in pixels. Defaults to 500 if not specified.
 *
 * Example usage:
 * ```jsx
 * <Image
 *   src="https://example.com/path/to/image.jpg"
 *   alt="Descriptive text for the image"
 *   width={640}
 *   height={480}
 * />
 * ```
 */
const Image = ({
  isPreload = false,
  preloadOptions = {
    as: "image",
    fetchPriority: "low",
  },
  src,
  className,
  alt,
  width,
  height,
  ...rest
}: ImageProps) => {
  if (isPreload) {
    preload(src, {
      //@ts-ignore
      as: "image",
      fetchPriority: "low",
      ...preloadOptions,
    });
  }

  return (
    <NextImage
      className={className}
      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
      src={src}
      alt={alt}
      width={width || 500}
      height={height || 500}
      {...rest}
    />
  );
};

export default Image
