const logReceivedFiles = (req: Request, res: Response, next: NextFunction) => {
    console.log('Received files:', req.files); 
    next(); 
  };
  export default logReceivedFiles;