export function svgToBase64(svgString) {
    // Remove newlines and extra spaces
    const cleanedSvgString = svgString.replace(/\s+/g, ' ').trim();
    
    // Convert to Base64
    const base64Svg = btoa(cleanedSvgString);
    
    // Return Base64 data URI
    return `data:image/svg+xml;base64,${base64Svg}`;
  }
  


  