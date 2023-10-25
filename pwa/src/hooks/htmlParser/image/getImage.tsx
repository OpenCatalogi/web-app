import { Image } from "@utrecht/component-library-react/dist/css-module";

export const getImage = (props: any) => {
  let src = props.src;

  if (!props.src.includes("https://" || "http://")) {
    const sessionUrl = process.env.GATSBY_GITHUB_REPOSITORY_URL;
    const url = sessionUrl?.replace("https://github.com/", "");

    src = `https://raw.githubusercontent.com/${url}/master/docs/features/${props.src}`;
  }

  let alt = props.alt;
  if (!props.alt) {
    alt = props.title;
  }
  if (!props.alt && !props.title) {
    alt = props.src;
  }

  const attributes = {
    ...props,
    src,
    alt,
    href: "",
    onClick: (e: MouseEvent) => {
      e.stopPropagation();
      open(src);
    },
  };
  return <Image {...attributes} />;
};
