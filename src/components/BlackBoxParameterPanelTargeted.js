import React, {useState} from 'react'
import '../static/css/WhiteBoxParameterPanel.css'

export default function BlackBoxParameterPanelTargeted(props) {
    const sliderValuesFGSM = [
        0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01, 
        0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.15, 
        0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 
        0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0
      ];

    const [sliderValue_fgsm, setSliderValue_fgsm] = useState(0)
    const [sliderValue_pgd_perturbations, setSliderValue_pgd_perturbations] = useState(0.15)
    const [sliderValue_pgd_steps, setSliderValue_pgd_steps] = useState(10)
    const [sliderValue_pgd_alpha, setSliderValue_pgd_alpha] = useState(0.001)
    const [sliderValue_cw_learning_rate, setSliderValue_cw_learning_rate] = useState(0.01)
    const [sliderValue_cw_n_iter, setSliderValue_cw_n_iter] = useState(100)
    const [sliderValue_cw_confidence, setSliderValue_cw_confidence] = useState(10)
    const [sliderValue_cw_langrange_mul, setSliderValue_cw_langrange_mul] = useState(0.001)
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedTargetImage, setSelectedTargetImage] = useState('')

    //FGSM Values
    const handleSliderChange_fgsm = (event) => {
        setSliderValue_fgsm(event.target.value);
      }

    //PGD Parameters
    const handleSliderChange_pgd_perturbations = (event) => {
        setSliderValue_pgd_perturbations(parseFloat(event.target.value).toFixed(2));
    }
    const handleSliderChange_pgd_steps = (event) => {
        setSliderValue_pgd_steps(event.target.value);
    }
    const handleSliderChange_pgd_alpha = (event) => {
        setSliderValue_pgd_alpha(event.target.value);
    }

    //CW Parameters
    const handleSliderChange_cw_n_iter = (event) => {
        setSliderValue_cw_n_iter(event.target.value);
    }
    const handleSliderChange_cw_confidence = (event) => {
        setSliderValue_cw_confidence(event.target.value);
    }
    const handleSliderChange_cw_langrange_mul = (event) => {
        setSliderValue_cw_langrange_mul(event.target.value);
    }
    const handleSliderChange_cw_learning_rate = (event) => {
        setSliderValue_cw_learning_rate(event.target.value);
    }

    //
    const handleImageSelection = (name) => {
        setSelectedImage(name);
    };

    const handleTargetImageSelection = (name) => {
        setSelectedTargetImage(name);
    };

    function capitalize(word) {
        if (!word) return ''; // Handle empty string or undefined cases
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    //A Function that will be invoked when we click on Ok! button
    //Parameters passed to it will be either of the three: "fgsm";"pgd";"carlini_wagner"
    //It will call the functions passed in as props from the Home.js and the variables of Home.js will be changed from here.
    //For Reference this is the call being made from Home.js 
    //return <WhiteBoxParamerterPanelTargeted changePerturbation={handlePerturbaion} changeImg={handleImage} changeAttack={handleSetAttack} changeTargetImg = {handleTargetImage} changeSteps = {handleSteps} changeAlpha={handleAlpha} />;
    
    const handleSubmission = (name) => {
        if (name==="itr_method") {
            props.changePerturbation(sliderValue_pgd_perturbations);
            props.changeImg(selectedImage);
            props.changeAttack(name);
            props.changeTargetImg(selectedTargetImage);   
            props.changeSteps(sliderValue_pgd_steps);
            props.changeAlpha(sliderValue_pgd_alpha);
        }
      };

      



  return (
    <>
        <div className="box">
            {/* Common Parameters like Image and Target Image for all Different Types of Attacks (FGSM PGD etc)*/}
            <div id="common_params">
                {/* Select Image */}
                <div id="Select_Image-dropdown">
                    <div className="whitebox-panel-dropdown">
                        <button className="whitebox-panel-dropdown-button">{selectedImage===""?"Select Image":"Source: "+capitalize(selectedImage)}</button>
                        <div className="whitebox-panel-dropdown-content">
                            <button className={selectedImage === "dog" ? "highlight" : ""} onClick={() => handleImageSelection('dog')} >Dog</button>
                            {/* <button className={selectedImage === "elephant" ? "highlight" : ""} onClick={() => handleImageSelection('elephant')} >Elephant</button>
                            <button className={selectedImage === "puppy" ? "highlight" : ""} onClick={() => handleImageSelection('puppy')}>Puppy</button> */}
                            <button className={selectedImage === "cat" ? "highlight" : ""} onClick={() => handleImageSelection('cat')}>Cat</button>
                        </div>
                    </div>
                </div>
                {/* Select Target Image */}
                <div id="Select_Image-dropdown">
                    <div className="whitebox-panel-dropdown">
                        <button className="whitebox-panel-dropdown-button">{selectedTargetImage===""?"Select Target":"Target: "+capitalize(selectedTargetImage)}</button>
                        <div className="whitebox-panel-dropdown-content">
                            <button className={selectedTargetImage === "dog" ? "highlight" : ""} onClick={() => handleTargetImageSelection('dog')} >Dog</button>
                            {/* <button className={selectedTargetImage === "elephant" ? "highlight" : ""} onClick={() => handleTargetImageSelection('elephant')} >Elephant</button>
                            <button className={selectedTargetImage === "puppy" ? "highlight" : ""} onClick={() => handleTargetImageSelection('puppy')}>Puppy</button> */}
                            <button className={selectedTargetImage === "cat" ? "highlight" : ""} onClick={() => handleTargetImageSelection('cat')}>Cat</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* PGD */}
            <div className="sub_box">
                <h5 style={{ textAlign: "center", border: "1px solid white", margin: "2px" }}>PGD</h5>
                <div id="Parameters-div">
                    <div id="Slider-div"> 
                        <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Perturbation:{parseFloat(sliderValue_pgd_perturbations).toFixed(2)}</label>
                        <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="0.05"
                        max="0.3"
                        step="0.05" 
                        value={sliderValue_pgd_perturbations} 
                        onChange={handleSliderChange_pgd_perturbations} 
                        />
                    </div>
                    <div id="Slider-div"> 
                        <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Steps:{sliderValue_pgd_steps}</label>
                        <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="10"
                        max="50"
                        step="10" 
                        value={sliderValue_pgd_steps} 
                        onChange={handleSliderChange_pgd_steps} 
                        />
                    </div>
                    <div id="Slider-div"> 
                        <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Alpha:{sliderValue_pgd_alpha}</label>
                        <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="0.001"
                        max="0.005"
                        step="0.001" 
                        value={sliderValue_pgd_alpha} 
                        onChange={handleSliderChange_pgd_alpha} 
                        />
                    </div>
                </div>
                <div id="Ok_button">
                    <button className="hover-button"  onClick={() => handleSubmission("pgd")}>Ok!</button>
                </div>
            </div>

            {/* Carlini Wagner */}
            <div className="sub_box" id="Carlini-Wagner-div">
                <h5 style={{ textAlign: "center", border: "1px solid white", margin: "2px" }}>Carlini Wagner</h5>
                <div id="Parameters-div" style={{marginBottom:'0px'}}>
                    <div id="Slider-div"> 
                        <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Iterations:{sliderValue_cw_n_iter}</label>
                        <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="20"
                        max="100"
                        step="20" 
                        value={sliderValue_cw_n_iter} 
                        onChange={handleSliderChange_cw_n_iter} 
                        />
                    </div>
                    <div id="Slider-div"> 
                        <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Learning Rate:{sliderValue_cw_learning_rate}</label>
                        <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="0.01"
                        max="0.05"
                        step="0.01" 
                        value={sliderValue_cw_learning_rate} 
                        onChange={handleSliderChange_cw_learning_rate} 
                        />
                    </div>
                </div>
                <div id="Parameters-div" style={{marginTop:'0px'}}>
                    <div id="Slider-div"> 
                        <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Langrange Multiplier:{sliderValue_cw_langrange_mul}</label>
                        <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="0.001"
                        max="0.005"
                        step="0.001" 
                        value={sliderValue_cw_langrange_mul} 
                        onChange={handleSliderChange_cw_langrange_mul} 
                        />
                    </div>
                    <div id="Slider-div"> 
                        <label htmlFor="slider" id="slider-label" style={{fontSize:'12px',textAlign:'center'}}>Confidence:{sliderValue_cw_confidence}</label>
                        <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="2"
                        max="10"
                        step="2" 
                        value={sliderValue_cw_confidence} 
                        onChange={handleSliderChange_cw_confidence} 
                        />
                    </div>
                </div>
                <div id="Ok_button">
                    <button className="hover-button"  onClick={() => handleSubmission("pgd")}>Ok!</button>
                </div>
            </div>

        </div>
    </>
  )
}
