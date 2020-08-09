import cx from 'classnames';
import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';
import s from './ImageUpload.module.scss';

const ImageUpload = ({ id, onInput, center, style }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e) => {
    const files = e.target.files;
    let pickedFile;
    let fileIsValid = isValid;

    if (files && files.length === 1) {
      pickedFile = files[0];

      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    onInput(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={s.formControl} style={style}>
      <input
        id={id}
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={pickedHandler}
        style={{ display: 'none' }}
      />

      <div className={cx(s.imageUpload, { [s.center]: center })}>
        <div className={s.imagePreview}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>

        <Button type="button" size="small" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
