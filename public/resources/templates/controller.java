package com.viridium.data.controller;

import com.viridium.common.BaseController;
import com.viridium.data.model.Emission;
import com.viridium.data.model.Feedback;
import com.viridium.data.service.EmissionRepo;
import com.viridium.data.service.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.QueryParam;

@RestController
@RequestMapping("data")
public class EmissionController extends BaseController {
    @Autowired
    EmissionRepo emissionRepo;
    @Autowired
    FeedbackRepo feedbackRepo;
    @GetMapping("/emissions")
    public Iterable<Emission> search(@QueryParam("text") String text) {
        Iterable<Emission> result;
        if (text != null) {
            result = emissionRepo.findByTextFree(text);
        } else {
            result = emissionRepo.findAll();
        }
        return result;
    }

    @PostMapping("/emissions")
    public Emission add(@RequestBody Emission emission) {

        emissionRepo.save(emission);
        return emission;
    }

    @GetMapping("/emissions/{id}")
    public Emission get(@PathVariable("id") String id) {
        try {
            return emissionRepo.findById(id).get();
        } catch (Exception e) {
            throw handleException(id, e);
        }
    }

    @PutMapping("/emissions/{id}")
    public Emission update(@PathVariable("id") String id, @RequestBody Emission rest) {
       // emissionRepo.
         return  rest;
    }

    @DeleteMapping("/emissions/{id}")
    public void delete(@PathVariable("id") String id) {
        try {
            emissionRepo.deleteById(id);
        } catch (Exception e) {
            throw handleException(id, e);
        }
    }
    @GetMapping("/feedbacks")
    public Iterable<Feedback> searchFeedbacks(@QueryParam("text") String text) {

        Iterable<Feedback> result;
        if (text != null) {
            result = feedbackRepo.findByTextFree(text);
        } else {
            result = feedbackRepo.findAll();
        }
        return result;
    }

    @PostMapping("/feedbacks")
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        feedbackRepo.save(feedback);
        return feedback;
    }

    @GetMapping("/feedbacks/{id}")
    public Feedback getFeedback(@PathVariable("id") String id) {
        try {
            return feedbackRepo.findById(id).get();
        } catch (Exception e) {
            throw handleException(id, e);
        }
    }

}