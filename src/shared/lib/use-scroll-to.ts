export function useScrollTo(headerOffset = 0) {
  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return { scrollTo };
}
