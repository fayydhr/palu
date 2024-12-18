// parse.js
class ParseUtility {
    static parseOBJ(objText) {
      const vertexPositions = [];
      const vertexNormals = [];
      const vertexTexCoords = [];
      const faceVertices = [];
      const faceNormals = [];
      const faceTexCoords = [];
  
      const lines = objText.split('\n');
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        switch(parts[0]) {
          case 'v':
            vertexPositions.push([
              parseFloat(parts[1]),
              parseFloat(parts[2]),
              parseFloat(parts[3])
            ]);
            break;
          case 'vn':
            vertexNormals.push([
              parseFloat(parts[1]),
              parseFloat(parts[2]),
              parseFloat(parts[3])
            ]);
            break;
          case 'vt':
            vertexTexCoords.push([
              parseFloat(parts[1]),
              parseFloat(parts[2])
            ]);
            break;
          case 'f':
            const face = parts.slice(1).map(vertex => {
              const indices = vertex.split('/').map(i => parseInt(i) - 1);
              return {
                position: vertexPositions[indices[0]],
                texCoord: indices[1] >= 0 ? vertexTexCoords[indices[1]] : null,
                normal: indices[2] >= 0 ? vertexNormals[indices[2]] : null
              };
            });
            faceVertices.push(face);
            break;
        }
      });
  
      return { 
        vertices: vertexPositions, 
        normals: vertexNormals, 
        texCoords: vertexTexCoords,
        faces: faceVertices 
      };
    }
  
    static async loadOBJ(url) {
      try {
        const response = await fetch(url);
        const objText = await response.text();
        return this.parseOBJ(objText);
      } catch (error) {
        console.error('Error loading OBJ:', error);
        return null;
      }
    }
  
    static triangulate(face) {
      if (face.length < 3) return [];
      if (face.length === 3) return [face];
  
      const triangles = [];
      for (let i = 1; i < face.length - 1; i++) {
        triangles.push([
          face[0],
          face[i],
          face[i + 1]
        ]);
      }
      return triangles;
    }
  }
  
  export default ParseUtility;