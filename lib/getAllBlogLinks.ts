
import fs from 'node:fs';
import path from 'path';

const CONTENT_DIR = './content/docs';

// export function getMdxLinks() {

export function getAllBlogLinks() {
  const links : string[] = [];

  function walkDir( currentPath: string) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stats = fs.statSync(fullPath);
       
        
      if (stats.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.mdx')) {
        // const relativePath = fullPath.replace(CONTENT_DIR, '').replace(/page\.mdx$/, '');
        const relativePath = fullPath.replace(/page\.mdx$/, '').replace('content', '')
        links.push(relativePath);
      }
    }
  }

  walkDir(CONTENT_DIR);
  
  const finalLinks : string[] = links.map((link) => link.replace(/\\/g, '/'));
//   console.log('finalLinks >>>',finalLinks);
  
//   return  finalLinks// Normalize for all OS
//   return links; // Normalize for all OS
    return makeNestedLinks(finalLinks);
}


export interface NodeType {
    name:string;
    path:string;
    children : NodeType[]
}

function makeNestedLinks(flatLinks:string[]) {

    // console.log("flatLinks >>> ",flatLinks);
    const root : NodeType[] = [];

    flatLinks.forEach((link) => {
      const segments = link.split('/').filter(Boolean); // Break into segments and remove empty entries
      let currentLevel = root;
  
      segments.forEach((segment, index) => {
        const existing = currentLevel.find((item) => item.name === segment);
  
        if (existing) {
          currentLevel = existing.children; // Move deeper if segment exists
        } else {
          const newNode = {
            name: segment,
            path: '/' + segments.slice(0, index + 1).join('/'),
            children: []
          };
          currentLevel.push(newNode);
          currentLevel = newNode.children; // Move deeper
        }
      });
    });
    
    // console.log("root >> ",root);

    // root.map((item) => {
    //     item.children.map((nItem) => {
    //         console.log("nested item >>",nItem);   
    //     })
    // })
    return root;
}

