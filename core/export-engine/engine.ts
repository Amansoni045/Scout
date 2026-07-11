import { ExportOptions } from "../../types";
import { logger } from "../logger/logger";

export async function exportDevCard(
  elementId: string,
  options: ExportOptions
): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    logger.error(`Export failed: Element with ID "${elementId}" not found.`);
    throw new Error(`Element #${elementId} not found.`);
  }

  logger.info(`Starting card export for format: ${options.format}, template: ${options.template}`);

  // Dynamic import of html-to-image to optimize bundle size
  const htmlToImage = await import("html-to-image");
  const scale = options.scale ?? 2; // Default to 2x for HD output

  const exportConfig = {
    pixelRatio: scale,
    backgroundColor: options.transparentBg ? "transparent" : undefined,
    style: {
      transform: "scale(1)",
      transformOrigin: "center center",
      margin: "0",
    },
  };

  let dataUrl = "";

  try {
    switch (options.format) {
      case "png":
        dataUrl = await htmlToImage.toPng(element, exportConfig);
        break;
      case "jpg":
        dataUrl = await htmlToImage.toJpeg(element, { ...exportConfig, quality: 0.95 });
        break;
      case "svg":
        dataUrl = await htmlToImage.toSvg(element, exportConfig);
        break;
      case "pdf":
        logger.warn("PDF export requested. Falling back to PNG export (V2 Puppeteer target).");
        dataUrl = await htmlToImage.toPng(element, exportConfig);
        break;
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }

    // Trigger download in browser
    const link = document.createElement("a");
    link.download = `devcard-${Date.now()}.${options.format}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    logger.info(`Export completed successfully for format: ${options.format}`);
    return dataUrl;
  } catch (error) {
    logger.error("Error generating card image:", error);
    throw error;
  }
}
