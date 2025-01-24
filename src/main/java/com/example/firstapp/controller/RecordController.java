package com.example.firstapp.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class RecordController {

    private final List<Record> records = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    @PostMapping("/add")
    public Record addRecord(@RequestBody Record record) {
        record.setId(counter.incrementAndGet());
        records.add(record);
        return record;
    }

    @GetMapping("/read")
    public List<Record> readRecords() {
        return records;
    }

    static class Record {
        private long id;
        private String value;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
}
