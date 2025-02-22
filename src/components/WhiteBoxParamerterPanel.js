import React, {useState} from 'react'
import '../static/css/WhiteBoxParameterPanel.css'

export default function WhiteBoxParamerterPanel(props) {
  const [sliderValue, setSliderValue] = useState(0.15)
  const [sliderValue_pgd_perturbations, setSliderValue_pgd_perturbations] = useState(0.15)
  const [sliderValue_pgd_steps, setSliderValue_pgd_steps] = useState(50)
  const [selectedImage, setSelectedImage] = useState('')



  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  }
  const handleSliderChange_pgd_perturbations = (event) => {
    setSliderValue_pgd_perturbations(event.target.value);
  }
  const handleSliderChange_pgd_steps = (event) => {
    setSliderValue_pgd_steps(event.target.value);
  }

  const handleImageSelection = (name) => {
    setSelectedImage(name);
  };

  const handleSubmission = (name) => {
    props.changeImg(selectedImage);
    props.changePerturbation(sliderValue);
    props.changeAttack(name);
  };

  function capitalize(word) {
    if (!word) return ''; // Handle empty string or undefined cases
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }







  return (
    <>
    
      <div className="box">
        <div id="common_params">
            <div id="Select_Image-dropdown">
              <div className="whitebox-panel-dropdown">
                <button className="whitebox-panel-dropdown-button">{selectedImage===""?"Select Image":capitalize(selectedImage)}</button>
                <div className="whitebox-panel-dropdown-content">
                  <button className={selectedImage === "dog" ? "highlight" : ""} onClick={() => handleImageSelection('dog')} >Dog</button>
                  <button className={selectedImage === "elephant" ? "highlight" : ""} onClick={() => handleImageSelection('elephant')} >Elephant</button>
                  <button className={selectedImage === "puppy" ? "highlight" : ""} onClick={() => handleImageSelection('puppy')}>Puppy</button>
                  <button className={selectedImage === "cat" ? "highlight" : ""} onClick={() => handleImageSelection('cat')}>Cat</button>
                </div>
              </div>
            </div>
        </div>
        
        <div className="sub_box">
          <h5 style={{ textAlign: "center" }}>FGSM</h5>
          <div id="Parameters-div">
            <div id="Slider-div"> 
              <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Perturbation:{sliderValue}</label>
                <input
                  type="range"
                  id="slider"
                  name="slider"
                  min="0"
                  max="1"
                  step="0.05" 
                  value={sliderValue} 
                  onChange={handleSliderChange} 
                />
            </div>
            <button className="hover-button" onClick={() => handleSubmission("fgsm")}>Ok!</button>
          </div>
        </div>

        <div className="sub_box">
          <h5 style={{ textAlign: "center" }}>PGD</h5>
          <div id="Parameters-div">
            
            <div id="Perturbation-div"> 
              <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Perturbation:{sliderValue_pgd_perturbations}</label>
                <input
                  type="range"
                  id="slider"
                  name="slider"
                  min="0"
                  max="1"
                  step="0.05" 
                  value={sliderValue_pgd_perturbations} 
                  onChange={handleSliderChange_pgd_perturbations} 
                />
            </div>
            <div id="Steps-div"> 
              <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Steps:{sliderValue_pgd_steps}</label>
                <input
                  type="range"
                  id="slider"
                  name="slider"
                  min="0"
                  max="500"
                  step="50" 
                  value={sliderValue_pgd_steps} 
                  onChange={handleSliderChange_pgd_steps} 
                />
            </div>
            <button className="hover-button"  onClick={() => handleSubmission("pgd")}>Ok!</button>
          </div>
        </div>

        <div className="sub_box" id="Carlini-Wagner-div">
          <h5 style={{ textAlign: "center" }}>Carlini Wagner</h5>
        </div>
      </div>
    </>
  );
}
