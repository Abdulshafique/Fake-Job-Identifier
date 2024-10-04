import React from "react";
import './DiscoverJob.css';
import { Link } from 'react-router-dom';
const DiscoverJob = () => {
return (
  <section class="article13 discoverJob" id="call-to-action-5-u84ruZTssy">
    <div class="container">
        <div class="row justify-content-center">
            <div class="card col-md-12 col-lg-10">
                <div class="card-wrapper">
                    <div class="card-box align-center">
                        <h4 class="card-title mbr-fonts-style display-2">
                            <strong>Join the Job Revolution Today!</strong>
                        </h4>
                        <p class="mbr-text mbr-fonts-style mt-4 display-7">
                        Discover a world of exciting job opportunities waiting for you. Let&#x27;s revolutionize the way you find your dream job.
                        </p>
                        <div class="mbr-section-btn mt-4">
                        <Link to="./Registration" class="btn btn-primary display-4">Start Your Journey</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    );
};
 export default DiscoverJob;