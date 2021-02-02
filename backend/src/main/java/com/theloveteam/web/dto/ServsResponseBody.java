package com.theloveteam.web.dto;

import com.theloveteam.web.dao.Serv;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ServsResponseBody {
    private List<Serv> servList;
}
